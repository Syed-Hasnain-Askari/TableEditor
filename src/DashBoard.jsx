import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import UserTable from './components/Table';
import * as AWS from 'aws-sdk';
export default function DashBoard() {
	const docClient = new AWS.DynamoDB.DocumentClient();
	const [data, setData] = useState({
		userData: null,
	});
	const [loading, setLoading] = useState(true);
	const onRead = () => {
		let params = {
			TableName: 'userDetails',
		};
		docClient.scan(params, function (err, data) {
			if (err) {
				console.log(err);
			} else {
				setData({
					userData: data,
				});
				setLoading(false);
			}
		});
	};
	const updateData = async (id, updatedItem) => {
		const result = data?.userData?.Items.find((item) => item.Id === id);

		if (!result) {
			console.error(`Unable to find item with id ${id}`);
			return;
		}

		const { Name, EPSG, Epoch, Geoid, Size } = result;

		if (!Name || !EPSG || !Epoch || !Geoid || !Size) {
			console.error(`Cannot update item with id ${id} as some required fields are missing`);
			return;
		}

		let params = {
			TableName: 'userDetails',
			Key: {
				Id: id,
			},
			UpdateExpression: `set #Name = :Name,#EPSG = :EPSG,#Epoch = :Epoch,#Geoid = :Geoid,#Size = :Size`,
			ExpressionAttributeNames: {
				'#Name': 'Name',
				'#EPSG': 'EPSG',
				'#Epoch': 'Epoch',
				'#Geoid': 'Geoid',
				'#Size': 'Size',
			},
			ExpressionAttributeValues: {
				':Name': updatedItem.Name ? updatedItem.Name : Name,
				':EPSG': updatedItem.EPSG ? updatedItem.EPSG : EPSG,
				':Epoch': updatedItem.Epoch ? updatedItem.Epoch : Epoch,
				':Geoid': updatedItem.Geoid ? updatedItem.Geoid : Geoid,
				':Size': updatedItem.Size ? updatedItem.Size : Size,
			},
			ReturnValues: 'ALL_NEW',
		};

		try {
			setLoading(true);
			const result = await docClient.update(params).promise();
			if (result) {
				console.log(`Successfully updated item with id ${id}`);
				console.log(result.Attributes);
			}
			onRead();
			setLoading(false);
		} catch (error) {
			console.error(`Unable to update item with id ${id}: ${error}`);
			setLoading(false);
		}
	};

	useEffect(() => {
		onRead();
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
					data={data.userData}
					updateData={updateData}
				/>
			)}
		</div>
	);
}
