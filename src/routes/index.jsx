import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from '../Login';
import SignUp from '../SignUp';
import ConfirmEmail from '../ConfirmEmail';
import DashBoard from '../DashBoard';
const Router = () => {
	return (
		<>
			<Suspense fallback={() => <div> Loading... </div>}>
				<Routes>
					<Route
						path='/'
						element={<DashBoard />}
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
				</Routes>
			</Suspense>
		</>
	);
};
export default Router;
