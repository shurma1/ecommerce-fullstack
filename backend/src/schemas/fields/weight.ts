import {typedParam} from '../../utils/typedSchema';

export const weight = typedParam({
	notEmpty: {
		errorMessage: 'WEIGHT_EMPTY'
	},
	isNumeric: {
		errorMessage: 'WEIGHT_TYPE_ERROR'
	}
});