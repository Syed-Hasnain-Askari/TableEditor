import { Amplify, Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
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
		console.log(error);
	}
};
export const handleSignUp = async (email, password) => {
	try {
		const res = await Auth.signUp(email, password);
		return res.user;
	} catch (error) {
		console.log(error);
	}
};
export const handleConfirmationEmail = async (email, code) => {
	try {
		const res = await Auth.confirmSignUp(email, code);
		return res;
	} catch (error) {
		console.log(error);
	}
};
