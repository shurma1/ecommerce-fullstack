import {NextFunction, Request, Response} from 'express';
import {TokenService, AuthService} from '../services';

class AuthController{
	async signUp(req: Request, res: Response, next: NextFunction){
		try {
			const {email, password, name} = req.body;

			const user = await AuthService.signUp(email, password, name);
			const tokens = TokenService.generateTokens({id: user.id});
			await TokenService.saveToken(user.id, tokens.refresh_token);

			return res.json({
				success: true,
				data: {
					id: user.id,
					email: user.email,
					...tokens
				}
			});
		}
		catch (e) {
			next(e);
		}
	}

	async signIn(req: Request, res: Response, next: NextFunction){
		try{
			const {email, password} = req.body;

			const player = await AuthService.signIn(email, password);
			const tokens = TokenService.generateTokens({id: player.id});
			await TokenService.saveToken(player.id, tokens.refresh_token);

			return res.json({
				success: true,
				data: {
					id: player.id,
					email: player.email,
					...tokens
				}
			});
		}
		catch (e) {
			next(e);
		}
	}
}

export default new AuthController();