import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
// STARTS HERE
import * as AWS from 'aws-sdk';
AWS.config.update({
	region: 'eu-north-1',
	secretAccessKey: 'cnAlq+tVQsi4kFneGPp7L3OEz556Q+S7GKlgWp3w',
	accessKeyId: 'AKIAZK5WGBFDTBZ3NAMJ',
});
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
