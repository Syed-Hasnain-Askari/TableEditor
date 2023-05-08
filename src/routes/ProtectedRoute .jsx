import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
	let user = window.localStorage.getItem('user');
	let result = JSON.parse(user);
	if (!result) {
		return <Navigate to='/login' />;
	}
	return children;
};
