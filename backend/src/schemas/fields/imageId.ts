import {typedParam} from '../../utils/typedSchema';

export const imageId = (optional = false) => typedParam({
	optional: optional,
	isUUID:{
		options: 4,
		errorMessage: 'INVALID_UUID'
	}
});