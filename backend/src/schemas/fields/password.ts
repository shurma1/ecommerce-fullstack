import {typedParam} from '../../utils/typedSchema';

export const password = typedParam({
	notEmpty: {
		errorMessage: 'PASSWORD_EMPTY'
	},
	isLength: {
		options: {
			min: 8,
			max: 100
		},
		errorMessage: 'PASSWORD_LENGTH_INVALID'
	}
});