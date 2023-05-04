import React from 'react';
import './App.css';
import Login from './Login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Header';
import DashBoard from './DashBoard';
const theme = createTheme();
function App() {
	return (
		<ThemeProvider theme={theme}>
			{/* <Header />
			<Login /> */}
			<DashBoard />
		</ThemeProvider>
	);
}

export default App;
