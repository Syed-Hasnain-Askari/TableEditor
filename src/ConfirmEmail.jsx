import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { handleConfirmationEmail } from '../src/config/UserPool';
import { notification } from 'antd';
function Copyright(props) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}>
			{'Copyright © '}

			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}
export default function ConfirmEmail() {
	const [loading, setLoading] = useState(false);
	const [redirect, setRedicrect] = useState(false);

	const location = useLocation();

	const navigate = useNavigate();
	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			const data = new FormData(event.currentTarget);
			const code = data.get('code');
			console.log(code, 'this is code');
			setLoading(true);
			handleConfirmationEmail(location.state.email, code).then(() => {
				notification
					.success({
						message: 'Succesfully confirmed!',
						description: 'Account created successfully, Redirecting you in a few!',
						placement: 'topRight',
						duration: 2,
						onClose: () => {
							setRedicrect(true);
						},
					})
					.catch((err) => {
						notification.error({
							message: 'Error',
							description: 'Account created successfully, Redirecting you in a few!',
							placement: 'topRight',
							duration: 2,
							onClose: () => {
								setRedicrect(true);
							},
						});
					});
			});
			setLoading(false);
		} catch (error) {
			notification.error({
				message: 'Invalid code!',
				description: 'Confirmation has been failed',
				placement: 'topRight',
				duration: 2,
			});
			setLoading(false);
		}
	};
	return (
		<Container
			component='main'
			maxWidth='xs'>
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography
					component='h1'
					variant='h5'>
					Confirm your email address
				</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit}
					noValidate
					sx={{ mt: 1 }}>
					<TextField
						margin='normal'
						color='success'
						required
						fullWidth
						id='code'
						label='Please enter code'
						name='code'
						autoFocus
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2, backgroundColor: '#007500' }}>
						Cionfirm
					</Button>
					<Grid container>
						<Grid item>
							<Link to='/signup'>Don't have an account? Sign Up</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Copyright sx={{ mt: 8, mb: 4 }} />
			{redirect && navigate('/login')}
		</Container>
	);
}
