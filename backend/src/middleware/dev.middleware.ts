import {NextFunction, Request, Response} from 'express';
import {ApiError} from '../error/apiError';
import {isDev} from '../utils/isDev';

const devMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if(! isDev) {
		throw ApiError.errorByType('PERMISSION_DENIED');
	}
	next();
};

export {
	devMiddleware
};