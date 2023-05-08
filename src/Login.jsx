import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link, useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { handleLogin } from '../src/config/UserPool';
import { useAuth } from '../src/hooks/useAuth';
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
export default function SignIn() {
	const [response, setResponse] = useState('');
	const navigate = useNavigate();
	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const email = data.get('email');
		const password = data.get('password');
		if (!email || !password) {
			return notification.error({
				message: 'Error',
				description: 'Fields can not be empty!',
				placement: 'topRight',
				duration: 2,
			});
		} else {
			try {
				const signInResponse = await handleLogin(email, password); // temporary password
				if (signInResponse) {
					window.localStorage.setItem('user', JSON.stringify(signInResponse));
					notification.success({
						message: 'Succesfully signed up user!',
						description: 'Account created successfully, Redirecting you in a few!',
						placement: 'topRight',
						duration: 2,
					});
					navigate('/dashboard');
				}
			} catch (error) {
				notification.error({
					message: 'Something went wrong!',
					description: `${error}`,
					placement: 'topRight',
					duration: 4,
				});
			}
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
					Sign in
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
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						autoFocus
					/>
					<TextField
						focused
						color='success'
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2, backgroundColor: '#007500' }}>
						Sign In
					</Button>
					<Grid container>
						<Grid
							item
							xs>
							<Link
								href='#'
								variant='body2'>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link to='/signup'>Don't have an account? Sign Up</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Copyright sx={{ mt: 8, mb: 4 }} />
		</Container>
	);
}
