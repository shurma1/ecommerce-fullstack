import {NextFunction, Request, Response} from 'express';
import {ApiError} from '../error/apiError';
import {Logger} from '../utils/logger/logger';



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandlingMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
	if(err instanceof ApiError){
		return res.status(err.status).json({
			message: err.message
		});
	}

	Logger.error(err);
	res.status(500).json({
		message: 'Unknown error!'
	});
};

export {
	errorHandlingMiddleware
};