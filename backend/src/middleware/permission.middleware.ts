import {NextFunction, Request, Response} from 'express';
import {PermissionKeys} from '../constants/Permission';
import {Permission as PermissionModel} from '../models/model';
import {ApiError} from '../error/apiError';
import {TokenService} from '../services';
const permissionMiddleware = (type?: PermissionKeys) =>
	async (req: Request, res: Response, next: NextFunction) => {

		try{
			const authorization = req.headers.authorization.split(' ');

			const [authType, token] = authorization;

			if(authorization.length !== 2 || ! token || authType !== 'Bearer') {
				throw ApiError.errorByType('AUTH_SCHEMA_INVALID');
			}

			const tokenPayload = TokenService.validateAccessToken(token);

			if(! tokenPayload){
				throw ApiError.errorByType('NOT_AUTHORIZED');
			}

			if(! type){
				return next();
			}

			const {id} = tokenPayload;

			const userPermissions = await PermissionModel.findOne({
				where: {
					userId: id,
					type
				}
			});

			if(! userPermissions){
				throw ApiError.errorByType('PERMISSION_DENIED');
			}

			next();
		}
		catch (e){
			next (e);
		}
	};

export {
	permissionMiddleware
};