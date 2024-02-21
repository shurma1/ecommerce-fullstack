import {NextFunction, Request, Response} from 'express';
import {ApiError} from '../error/apiError';
import {Logger} from '../utils/logger/logger';



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandlingMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
	if(err instanceof ApiError){
		return res.status(err.code).json({
			success: false,
			data: {
				type: err.type,
				description: err.description,
				code: err.code,
			}
		});
	}

	Logger.error(err);
	res.status(500).json({
		success: false,
		data: {
			type: 'UNKNOWN_ERROR',
			code: 500,
		}
	});
};

export {
	errorHandlingMiddleware
};