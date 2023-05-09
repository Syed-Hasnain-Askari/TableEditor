import React from 'react';
import './App.css';
import SignIn from './Login';
import SignUp from './SignUp';
import Error from './Error';
import ConfirmEmail from './ConfirmEmail';
import DashBoard from './DashBoard';
import { Navigate } from 'react-router-dom';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
	let user = window.localStorage.getItem('user');
	let result = JSON.parse(user);
	if (!result) {
		return <Navigate to='/login' />;
	}
	return children;
};
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
