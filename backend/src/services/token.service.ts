import jwt from 'jsonwebtoken';
import {Token} from '../models/model';
import {ApiError} from '../error/apiError';
import config from 'config';


interface IPayload {
	id: string;
}


class TokenService{
	generateTokens(payload: IPayload | object | Buffer){
		const accessToken = jwt.sign(
			payload,
			config.get('jwt.access_secret'),
			{
				expiresIn: config.get('jwt.access_expires'),
			});

		const refreshToken = jwt.sign(
			payload,
			config.get('jwt.refresh_secret'),
			{
				expiresIn: config.get('jwt.refresh_expires'),
			});

		return{
			access_token: accessToken,
			refresh_token: refreshToken
		};
	}

	async saveToken(userId: string, refreshToken: string, ip = 'none', browser = 'none') {
		const token = await Token.create({
			token: refreshToken,
			userId: userId,
			ip: ip,
			browser: browser
		});

		if(! token){
			throw ApiError.badRequest('Something went wrong');
		}

		return token;
	}

	async removeToken(refreshToken: string) {
		const token = await Token.findOne({where: {token: refreshToken}});
		await token.destroy();
	}

	validateAccessToken(token: string){
		try{
			const payload = jwt.verify(token, config.get('jwt.access_secret')) as IPayload;
			return payload;
		}
		catch {
			return null;
		}
	}

	validateRefreshToken(token: string){
		try{
			const payload = jwt.verify(token, config.get('jwt.refresh_secret')) as IPayload;
			const isTokenExists = !!Token.findOne({where: {token}});
			if(! isTokenExists){
				throw new Error('Token not found');
			}
			return payload;
		}
		catch {
			return null;
		}
	}
}

export default new TokenService();