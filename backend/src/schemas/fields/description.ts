import {typedParam} from '../../utils/typedSchema';

export const description = typedParam({
	isLength: {
		options: {
			max: 200
		},
		errorMessage: 'DESCRIPTION_TOO_LONG'
	}
});