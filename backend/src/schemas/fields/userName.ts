import {typedParam} from '../../utils/typedSchema';

export const userName = typedParam({
	notEmpty: {
		errorMessage: 'NAME_EMPTY'
	},
	isLength: {
		options: {
			min: 2,
			max: 20
		},
		errorMessage: 'NAME_LENGTH_INVALID'
	},
	matches: {
		options: /^[a-zA-Zа-яА-Я]+$/,
		errorMessage: 'NAME_INVALID'
	}
});