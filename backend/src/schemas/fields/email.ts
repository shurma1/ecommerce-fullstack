import {typedParam} from '../../utils/typedSchema';

export const email = typedParam({
	notEmpty: {
		errorMessage: 'EMAIL_EMPTY'
	},
	isEmail: {
		errorMessage: 'EMAIL_INVALID'
	}
});