import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import UserTable from './components/Table';
import * as AWS from 'aws-sdk';
export default function DashBoard() {
	const dynamodb = new AWS.DynamoDB();
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

	useEffect(() => {
		onRead();
	}, []);
	return (
		<div>
			<Header />
			{loading ? (
				<Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
					<CircularProgress />
				</Box>
			) : (
				<UserTable data={data.userData} />
			)}
		</div>
	);
}
