import config from 'config';

const allowedFileMimeTypes = config.get('file.allow_types') as string[];

const API_ERROR = {
	EMAIL_INVALID: {
		type: 'EMAIL_INVALID',
		description: 'The specified email is invalid.',
		code: 400,
	},
	PASSWORD_INVALID: {
		type: 'PASSWORD_INVALID',
		description: 'The password must contain at least 8 characters',
		code: 400,
	},
	NAME_INVALID: {
		type: 'NAME_INVALID',
		description: 'The name must contain only letters',
		code: 400,
	},
	NAME_LENGTH_INVALID: {
		type: 'NAME_LENGTH_INVALID',
		description: 'The name must be at least 2 letters long.',
		code: 400,
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
		description: 'The email or password is incorrect',
		code: 400,
	},
	FILE_NOT_ALLOWED: {
		type: 'FILE_NOT_ALLOWED',
		description: `The file type is not supported. Try: ${allowedFileMimeTypes.map(item => `'${item}'`).join(', ') }.`,
		code: 400,
	},
	FILE_ID_NOT_EXISTS: {
		type: 'FILE_ID_NOT_EXISTS',
		description: 'The file ID is not specified',
		code: 400,
	},
	FILE_NOT_EXISTS: {
		type: 'FILE_NOT_EXISTS',
		description: 'The file not exist',
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
	FILE_EMPTY: {
		type: 'FILE_EMPTY',
		description: 'The provided file is empty.',
		code: 400,
	},
	LOAD_MULTIPLY_FILES_FORBIDDEN: {
		type: 'LOAD_MULTIPLY_FILES_FORBIDDEN',
		description: 'Only one file is allowed to be uploaded at a time.',
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
	}
};

type ErrorKeys = keyof typeof API_ERROR;

export {
	API_ERROR,
	ErrorKeys
};
