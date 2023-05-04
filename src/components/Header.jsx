import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
export default function Header() {
	return (
		<>
			<Toolbar sx={{ borderBottom: 1, borderColor: 'divider', justifyContent: 'space-between', overflowX: 'auto' }}>
				<Button size='small'>Subscribe</Button>
				<Button
					variant='outlined'
					size='small'>
					Logout
				</Button>
			</Toolbar>
		</>
	);
}
