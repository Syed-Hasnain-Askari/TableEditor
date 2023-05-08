import React, { Suspense, useState, useEffect } from 'react';
import { Route, Routes, useRoutes } from 'react-router-dom';
import SignIn from '../Login';
import SignUp from '../SignUp';
import Error from '../Error';
import ConfirmEmail from '../ConfirmEmail';
import DashBoard from '../DashBoard';
import { ProtectedRoute } from '../routes/ProtectedRoute ';
const Router = () => {
	return (
		<React.Fragment>
			<Routes>
				<Route
					path='/dashboard'
					element={
						<ProtectedRoute>
							<DashBoard />
						</ProtectedRoute>
					}
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
			</Routes>
		</React.Fragment>
	);
};
export default Router;
