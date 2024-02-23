import {typedSchema} from '../utils/typedSchema';
import {email} from './fields/email';
import {password} from './fields/password';
import {userName} from './fields/userName';

export const signupSchema = () => {
	return typedSchema({
		name: userName,
		email: email,
		password: password
	});
};
