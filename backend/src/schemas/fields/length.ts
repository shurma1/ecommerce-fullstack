import {typedParam} from '../../utils/typedSchema';

export const length = typedParam({
	notEmpty: {
		errorMessage: 'LENGTH_EMPTY'
	},
	isNumeric: {
		errorMessage: 'LENGTH_TYPE_ERROR'
	}
});