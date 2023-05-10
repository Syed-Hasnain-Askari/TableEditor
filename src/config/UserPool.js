import { Amplify, Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { notification } from 'antd';
Amplify.configure(awsconfig);
export const handleSignOut = async () => {
	try {
		const res = await Auth.signOut();
		return res;
	} catch (error) {
		console.log(error);
	}
};
export const handleLogin = async (email, password) => {
	try {
		const res = await Auth.signIn(email, password);
		return res;
	} catch (error) {
		return notification.error({
			message: 'Error',
			description: `${error}`,
			placement: 'topRight',
			duration: 2,
		});
	}
};
export const handleSignUp = async (email, password) => {
	try {
		const res = await Auth.signUp(email, password);
		return res.user;
	} catch (error) {
		return notification.error({
			message: 'Error',
			description: `${error}`,
			placement: 'topRight',
			duration: 2,
		});
	}
};
export const handleConfirmationEmail = async (email, code) => {
	try {
		const res = await Auth.confirmSignUp(email, code);
		return res;
	} catch (error) {
		return notification.error({
			message: 'Error',
			description: `${error}`,
			placement: 'topRight',
			duration: 2,
		});
	}
};
