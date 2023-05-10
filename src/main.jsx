import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './App.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// STARTS HERE
import * as AWS from 'aws-sdk';
AWS.config.update({
	// region: 'eu-north-1',
	region: 'eu-north-1',
	secretAccessKey: import.meta.env.VITE_SECRETACCESSKEY,
	accessKeyId: import.meta.env.VITE_ACCESSKEYID,
});
const theme = createTheme({
	palette: {
		primary: { main: '#3a34d2' },
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
