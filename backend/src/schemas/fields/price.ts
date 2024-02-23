import {typedParam} from '../../utils/typedSchema';

export const price = (optional = false) =>  typedParam({
	optional: optional,
	notEmpty: {
		errorMessage: 'PRICE_EMPTY'
	},
	isNumeric: {
		errorMessage: 'PRICE_TYPE_ERROR'
	}
});