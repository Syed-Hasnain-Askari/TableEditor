import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
// STARTS HERE
import * as AWS from 'aws-sdk';
AWS.config.update({
	region: 'eu-north-1',
	secretAccessKey: import.meta.env.VITE_SECRETACCESSKEY,
	accessKeyId: import.meta.env.VITE_ACCESSKEYID,
});
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
