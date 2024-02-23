import {typedParam} from '../../utils/typedSchema';

export const name = typedParam({
	isLength: {
		options: {
			max: 20
		},
		errorMessage: 'NAME_TOO_LONG'
	},
	notEmpty: {
		errorMessage: 'NAME_EMPTY'
	}
});