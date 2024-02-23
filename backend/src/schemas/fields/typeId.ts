import {typedParam} from '../../utils/typedSchema';

export const typeId = (optional = false) => typedParam({
	optional: optional,
	notEmpty:{
		errorMessage: 'TYPE_ID_EMPTY'
	},
	isUUID:{
		options: 4,
		errorMessage: 'INVALID_UUID'
	}
});