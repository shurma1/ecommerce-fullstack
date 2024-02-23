import {NextFunction, Request, Response} from 'express';
import {TokenService, AuthService} from '../services';


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: User id
 *         email:
 *           type: string
 *           description: User email
 *         access_token:
 *           type: string
 *           description: access_token
 *         refresh_token:
 *           type: string
 *           description: refresh_token
 *       example:
 *         id: b176c757-0779-459e-aea1-d3c97298c2a1
 *         email: mail@example.com
 *         access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIxNzZjNzU3LTA3NzktNDU5ZS1hZWExLWQzYzk3Mjk4YzJhYiIsImlhdCI6MTcwODQ5NTk0NCwiZXhwIjoxNzA4NDk5NTQ0fQ.ZO2VYtn_P6w6QwcFCTzpIjC-rZei-taaF-END3q7vHA
 *         refresh_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIxNzZjNzU3LTA3NzktNDU5ZS1hZWExLWQzYzk3Mjk4YzJhYiIsImlhdCI6MTcwODQ5NTk0NCwiZXhwIjoxNzExMDg3OTQ0fQ.92X5sPAKWVzN7mQy3PGUpbJ8fKn9rnLYHP01lxGePKk
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth API
 */

class AuthController{

	/**
	 * @swagger
	 * /auth/singUp:
	 *   post:
	 *     summary: Register the user, return user and auth data
	 *     tags: [Auth]
	 *     parameters:
	 *       - in: raw
	 *         name: email
	 *         schema:
	 *           type: string
	 *         required: true
	 *         description: The user Email
	 *
	 *       - in: raw
	 *         name: password
	 *         schema:
	 *           type: string
	 *         required: true
	 *         description: The user password. > 8 letters
	 *
	 *       - in: raw
	 *         name: name
	 *         schema:
	 *           type: string
	 *         required: true
	 *         description: The user name. > 1 letters
	 *
	 *     responses:
	 *       200:
	 *         description: OK
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/User'
	 *       400-1:
	 *         description: |
	 *           EMAIL_EMPTY:
	 *             No email provided.
	 *       400-2:
	 *         description: |
	 *           EMAIL_INVALID:
	 *             Invalid email format.
	 *       400-3:
	 *         description: |
	 *           NAME_EMPTY:
	 *             No name provided.
	 *       400-4:
	 *         description: |
	 *           NAME_LENGTH_ERROR:
	 *             The name must consist of a minimum 2 letters and maximum of 20.
	 *       400-5:
	 *         description: |
	 *           NAME_INVALID:
	 *             The name must contain only RU or EN letters.
	 *       400-6:
	 *         description: |
	 *           PASSWORD_EMPTY:
	 *             No password provided.
	 *       400-7:
	 *         description: |
	 *           PASSWORD_LENGTH_INVALID:
	 *             The password must consist of a minimum 8 symbols and a maximum of 100.
	 *       400-8:
	 *         description: |
	 *           USER_ALREADY_EXISTS:
	 *             The user with this email already exists.
	 *
	 */

	async signUp(req: Request, res: Response, next: NextFunction){
		try {
			const {email, password, name} = req.body;

			const user = await AuthService.signUp({
				email,
				password,
				name
			});
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



	/**
	 * @swagger
	 * /auth/singIn:
	 *   post:
	 *     summary: Login the user, return user and auth data
	 *     tags: [Auth]
	 *     parameters:
	 *       - in: path
	 *         name: email
	 *         schema:
	 *           type: string
	 *         required: true
	 *         description: The user Email
	 *
	 *       - in: path
	 *         name: password
	 *         schema:
	 *           type: string
	 *         required: true
	 *         description: The user password. > 8 letters
	 *
	 *     responses:
	 *       200:
	 *         description: OK
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/User'
	 *       400-1:
	 *         description: |
	 *           EMAIL_EMPTY:
	 *             No email provided.
	 *       400-2:
	 *         description: |
	 *           EMAIL_INVALID:
	 *             Invalid email format.
	 *       400-3:
	 *         description: |
	 *           PASSWORD_EMPTY:
	 *             No password provided.
	 *       400-4:
	 *         description: |
	 *           PASSWORD_LENGTH_INVALID:
	 *             The password must consist of a minimum 8 symbols and a maximum of 100.
	 *       400-5:
	 *         description: |
	 *           USER_NOT_EXISTS:
	 *             The email or password is incorrect.
	 */

	async signIn(req: Request, res: Response, next: NextFunction){
		try{
			const {email, password} = req.body;

			const player = await AuthService.signIn({
				email,
				password
			});
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