import {typedParam} from '../../utils/typedSchema';

export const height = typedParam({
	notEmpty: {
		errorMessage: 'HEIGHT_EMPTY'
	},
	isNumeric: {
		errorMessage: 'HEIGHT_TYPE_ERROR'
	}
});