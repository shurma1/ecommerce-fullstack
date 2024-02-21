import {ErrorKeys, API_ERROR} from '../constants/Errors';

export class ApiError extends Error {
	code: number;
	type: string;
	description: string;
	constructor(code: number, description: string, type: string = undefined) {
		super();
		this.code = code;
		this.type = type;
		this.description = description;
	}

	static badRequest(description: string){
		return new ApiError(400, description);
	}

	static conflict(description: string){
		return new ApiError(409, description);
	}

	static internal(description: string){
		return new ApiError(500, description);
	}

	static forbidden(description: string){
		return new ApiError(403, description);
	}

	static errorByType(type: ErrorKeys){
		const error = API_ERROR[type];
		return new ApiError(error.code, error.description, error.type);
	}

}