import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { Amplify, Auth } from 'aws-amplify';
import { notification } from 'antd';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

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
export default function SignUp() {
	const [loading, setLoading] = useState(false);
	const [redirect, setRedicrect] = useState(false);
	const [email, setEmail] = useState('');
	const navigate = useNavigate();
	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			const data = new FormData(event.currentTarget);
			const email = data.get('email');
			const password = data.get('password');
			setLoading(true);
			await Auth.signUp({
				username: email,
				password: password,
				validationData: [],
			}).then(() => {
				notification.success({
					message: 'Succesfully signed up user!',
					description: 'Account created successfully, Redirecting you in a few!',
					placement: 'topRight',
					duration: 2,
				});
				setLoading(false);
				navigate('/confirmemail', { state: { email: email } });
			});
		} catch (error) {
			notification.error({
				message: 'Something went wrong!',
				description: 'Error signing up user',
				placement: 'topRight',
				duration: 2,
			});
			setLoading(false);
		}
	};
	return (
		<>
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
						Sign up
					</Typography>
					<Box
						component='form'
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}>
						<Grid
							container
							spacing={2}>
							<Grid
								item
								xs={12}>
								<TextField
									required
									fullWidth
									color='success'
									id='email'
									label='Email Address'
									name='email'
									autoComplete='email'
								/>
							</Grid>
							<Grid
								item
								xs={12}>
								<TextField
									required
									fullWidth
									color='success'
									name='password'
									label='Password'
									type='password'
									id='password'
									autoComplete='new-password'
								/>
							</Grid>
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2, backgroundColor: '#007500' }}>
							Sign Up
						</Button>
						<Grid
							container
							justifyContent='flex-end'>
							<Grid item>
								<Link to='/login'>Already have an account? Sign in</Link>
							</Grid>
						</Grid>
						{/* <Grid container>
							<Typography>{error}</Typography>
						</Grid> */}
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</>
	);
}
