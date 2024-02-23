import {typedParam} from '../../utils/typedSchema';

export const brandId = (optional = false) => typedParam({
	optional: optional,
	notEmpty:{
		errorMessage: 'BRAND_ID_EMPTY'
	},
	isUUID:{
		options: 4,
		errorMessage: 'INVALID_UUID'
	}
});