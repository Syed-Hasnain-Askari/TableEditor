import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { handleSignOut } from '../config/UserPool';
export default function Header(props) {
	const navigate = useNavigate();
	const handleLogout = async () => {
		const logout = await handleSignOut();
		window.localStorage.removeItem('user');
		navigate('/login');
	};
	return (
		<>
			<Toolbar sx={{ borderBottom: 1, borderColor: 'divider', justifyContent: 'space-between', overflowX: 'auto' }}>
				<Button size='small'>Subscribe</Button>
				<Button
					variant='outlined'
					size='small'
					onClick={() => handleLogout()}>
					Logout
				</Button>
			</Toolbar>
		</>
	);
}
