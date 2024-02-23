import config from 'config';

const allowedFileMimeTypes = config.get('file.allow_types') as string[];

const API_ERROR = {
	PASSWORD_INVALID: {
		type: 'PASSWORD_INVALID',
		description: 'The password must contain at least 8 characters',
		code: 400,
	},
	IMAGE_NOT_ALLOWED: {
		type: 'IMAGE_NOT_ALLOWED',
		description: `The image type is not supported. Try: ${allowedFileMimeTypes.map(item => `'${item}'`).join(', ') }.`,
		code: 400,
	},
	IMAGE_ID_NOT_EXISTS: {
		type: 'IMAGE_ID_NOT_EXISTS',
		description: 'The image ID is not specified',
		code: 400,
	},
	IMAGE_NOT_EXISTS: {
		type: 'IMAGE_NOT_EXISTS',
		description: 'The image not exist',
		code: 400,
	},
	IMAGE_SIZE_INVALID: {
		type: 'IMAGE_SIZE_INVALID',
		description: 'The file size is specified: [HEIGHT]x[WIDTH], where [HEIGHT] and [WIDTH] are the number of pixels',
		code: 400,
	},
	IMAGE_QUALITY_INVALID: {
		type: 'IMAGE_QUALITY_INVALID',
		description: 'The quality must be specified from 0 to 100',
		code: 400,
	},
	IMAGE_EMPTY: {
		type: 'IMAGE_EMPTY',
		description: 'The provided IMAGE is empty.',
		code: 400,
	},
	LOAD_MULTIPLY_IMAGES_FORBIDDEN: {
		type: 'LOAD_MULTIPLY_IMAGES_FORBIDDEN',
		description: 'Only one image is allowed to be uploaded at a time.',
		code: 400,
	},
	PARAMS_INVALID: {
		type: 'PARAMS_INVALID',
		description: '',
		code: 400,
	},
	AUTH_SCHEMA_INVALID: {
		type: 'AUTH_SCHEMA_INVALID',
		description: 'The authorization scheme is incorrect. only Bearer is supported',
		code: 401,
	},
	NOT_AUTHORIZED:{
		type: 'NOT_AUTHORIZED',
		description: 'Not authorized',
		code: 401,
	},
	PERMISSION_DENIED: {
		type: 'PERMISSION_DENIED',
		description: 'You do not have permission to complete this request',
		code: 403
	},
	NOT_FOUND: {
		type: 'NOT_FOUND',
		description: 'Nothing found for this id',
		code: 400
	},
	IMAGE_NOT_FOUND: {
		type: 'IMAGE_NOT_FOUND',
		description: 'Image not found',
		code: 400
	},
	INVALID_UUID: {
		type: 'INVALID_UUID',
		description: 'The UUID is invalid',
		code: 400
	},
	NAME_ALRAEDY_EXISTS: {
		type: 'NAME_ALRAEDY_EXISTS',
		description: 'Element with this name already exists',
		code: 400
	},






	USER_ALREADY_EXISTS: {
		type: 'USER_ALREADY_EXISTS',
		description: 'The user with this email already exists.',
		code: 400,
	},
	TOKEN_INVALID: {
		type: 'TOKEN_INVALID',
		description: 'The token is invalid.',
		code: 400,
	},
	USER_NOT_EXISTS: {
		type: 'USER_NOT_EXISTS',
		description: 'The email or password is incorrect.',
		code: 400,
	},
	NAME_TOO_LONG: {
		type: 'NAME_TOO_LONG',
		description: 'The name must consist of a maximum of 20 letters.',
		code: 400
	},
	NAME_EMPTY: {
		type: 'NAME_EMPTY',
		description: 'No name provided.',
		code: 400
	},
	NAME_INVALID: {
		type: 'NAME_INVALID',
		description: 'The name must contain only RU or EN letters',
		code: 400,
	},
	NAME_LENGTH_INVALID: {
		type: 'NAME_LENGTH_INVALID',
		description: 'The name must consist of a minimum 2 letters and maximum of 20.',
		code: 400
	},

	DESCRIPTION_TOO_LONG: {
		type: 'DESCRIPTION_TOO_LONG',
		description: 'The description must consist of a maximum of 200 letters.',
		code: 400
	},

	WEIGHT_EMPTY: {
		type: 'WEIGHT_EMPTY',
		description: 'No weight provided.',
		code: 400
	},
	WEIGHT_TYPE_ERROR: {
		type: 'WEIGHT_TYPE_ERROR',
		description: 'The weight type must be Float or Number.',
		code: 400
	},

	HEIGHT_EMPTY: {
		type: 'HEIGHT_EMPTY',
		description: 'No height provided.',
		code: 400
	},
	HEIGHT_TYPE_ERROR: {
		type: 'HEIGHT_TYPE_ERROR',
		description: 'The height type must be Float or Number.',
		code: 400
	},

	LENGTH_EMPTY: {
		type: 'LENGTH_EMPTY',
		description: 'No length provided.',
		code: 400
	},
	LENGTH_TYPE_ERROR: {
		type: 'LENGTH_TYPE_ERROR',
		description: 'The length type must be Float or Number.',
		code: 400
	},

	PRICE_EMPTY: {
		type: 'PRICE_EMPTY',
		description: 'No price provided.',
		code: 400
	},
	PRICE_TYPE_ERROR: {
		type: 'PRICE_TYPE_ERROR',
		description: 'The price type must be Float or Number.',
		code: 400
	},

	TYPE_ID_EMPTY: {
		type: 'TYPE_ID_EMPTY',
		description: 'No type ID provided.',
		code: 400
	},

	BRAND_ID_EMPTY: {
		type: 'BRAND_ID_EMPTY',
		description: 'No brand ID provided.',
		code: 400
	},
	EMAIL_INVALID: {
		type: 'EMAIL_INVALID',
		description: 'Invalid email format',
		code: 400,
	},
	EMAIL_EMPTY: {
		type: 'EMAIL_EMPTY',
		description: 'No email provided.',
		code: 400,
	},

	PASSWORD_LENGTH_INVALID: {
		type: 'PASSWORD_LENGTH_INVALID',
		description: 'The password must consist of a minimum 8 symbols and a maximum of 100',
		code: 400,
	},
	PASSWORD_EMPTY: {
		type: 'PASSWORD_EMPTY',
		description: 'No password provided.',
		code: 400,
	}





};

type ErrorKeys = keyof typeof API_ERROR;

export {
	API_ERROR,
	ErrorKeys
};
