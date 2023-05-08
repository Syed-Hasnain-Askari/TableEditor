import React from 'react';
import './App.css';
import SignIn from './Login';
import SignUp from './SignUp';
import Error from './Error';
import ConfirmEmail from './ConfirmEmail';
import DashBoard from './DashBoard';
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './routes/ProtectedRoute ';
import { Route, createBrowserRouter, createRoutesFromElements, defer } from 'react-router-dom';
export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route
				path='/dashboard'
				element={
					<ProtectedRoute>
						<DashBoard />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/'
				element={<SignIn />}
			/>
			<Route
				path='/login'
				element={<SignIn />}
			/>
			<Route
				path='/signup'
				element={<SignUp />}
			/>
			<Route
				path='/confirmemail'
				element={<ConfirmEmail />}
			/>
			<Route
				path='*'
				element={<Error />}
			/>
		</Route>
	)
);
