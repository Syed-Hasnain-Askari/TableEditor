import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import UserTable from './components/Table';
import * as AWS from 'aws-sdk';
export default function DashBoard() {
	const docClient = new AWS.DynamoDB.DocumentClient();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const onRead = async () => {
		setLoading(true);
		try {
			let params = {
				TableName: 'userDetails',
			};
			const result = await docClient.scan(params).promise();
			setData(result);
			setLoading(false);
		} catch (e) {
			console.log(e);
			setLoading(true);
		}
	};
	const updateData = async (id, updatedItem) => {
		try {
			setLoading(true);

			// Retrieve the item from the database
			const { Item } = await docClient.get({ TableName: 'userDetails', Key: { Id: id } }).promise();
			if (!Item) {
				console.error(`Unable to find item with id ${id}`);
				return;
			}
			// Update the item with the new values
			const updatedAttributes = {};
			if (updatedItem.name) updatedAttributes.name = updatedItem.name;
			if (updatedItem.raw_epsg) updatedAttributes.raw_epsg = updatedItem.raw_epsg;
			if (updatedItem.raw_epoch) updatedAttributes.raw_epoch = updatedItem.raw_epoch;
			if (updatedItem.raw_geoid) updatedAttributes.raw_geoid = updatedItem.raw_geoid;
			if (updatedItem.acquisition_date) updatedAttributes.acquisition_date = updatedItem.acquisition_date;
			if (updatedItem.acquisition_type) updatedAttributes.acquisition_type = updatedItem.acquisition_type;

			// Update the item in the database
			const params = {
				TableName: 'userDetails',
				Key: { Id: id },
				UpdateExpression:
					'SET ' +
					Object.keys(updatedAttributes)
						.map((key) => `#${key} = :${key}`)
						.join(', '),
				ExpressionAttributeNames: Object.fromEntries(Object.keys(updatedAttributes).map((key) => [`#${key}`, key])),
				ExpressionAttributeValues: Object.fromEntries(
					Object.keys(updatedAttributes).map((key) => [`:${key}`, updatedAttributes[key]])
				),
				ReturnValues: 'ALL_NEW',
			};
			const { Attributes } = await docClient.update(params).promise();
			// Reload the data and update the table
			await onRead();
			setLoading(false);
		} catch (error) {
			console.error(`Unable to update item with id ${id}: ${error}`);
			setLoading(false);
		}
	};

	useEffect(() => {
		onRead();
	}, []);
	const [userState, setUserState] = useState(null);
	useEffect(() => {
		const storedUser = window.localStorage.getItem('user');
		if (storedUser) {
			setUserState(JSON.parse(storedUser));
		}
	}, []);
	return (
		<div>
			<Header />
			{loading ? (
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
					<CircularProgress />
				</Box>
			) : (
				<UserTable
					data={data}
					updateData={updateData}
				/>
			)}
		</div>
	);
}
