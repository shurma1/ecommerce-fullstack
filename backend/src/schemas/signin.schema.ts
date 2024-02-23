import {typedSchema} from '../utils/typedSchema';
import {email} from './fields/email';
import {password} from './fields/password';

export const signinSchema = () => {
	return typedSchema({
		email: email,
		password: password
	});
};
