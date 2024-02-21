import {ApiError} from '../error/apiError';
import validator from 'validator';
import {User} from '../models/model';
import bcrypt from 'bcrypt';
class AuthService {

	async signUp(email: string, password: string, name: string) {
		if(
			typeof email !== 'string'
			|| !validator.isEmail(email)
		) {
			throw ApiError.errorByType('EMAIL_INVALID');
		}

		if(!password || password.length <= 8) {
			throw ApiError.errorByType('PASSWORD_INVALID');
		}

		const nameRegex = /^[a-zA-Zа-яА-Я]+$/;

		if(typeof name !== 'string' || ! nameRegex.test(name)) {
			throw ApiError.errorByType('NAME_INVALID');
		}

		if(name.length <= 1) {
			throw ApiError.errorByType('NAME_LENGTH_INVALID');
		}

		const isUserExist = !! await User.findOne({
			where: {
				email: email
			}
		});

		if (isUserExist) {
			throw ApiError.errorByType('USER_ALREADY_EXISTS');
		}

		const hashPassword = await bcrypt.hash(password, 10);

		const user =  await User.create({
			name,
			email,
			password: hashPassword
		});

		return user;

	}

	async signIn(email: any, password: any){
		if(
			!email
			|| typeof email !== 'string'
			|| !validator.isEmail(email)
		) {
			throw ApiError.errorByType('EMAIL_INVALID');
		}

		if(!password || password.length <= 8) {
			throw ApiError.errorByType('PASSWORD_INVALID');
		}

		const user = await User.findOne({
			where: {
				email
			}
		});

		if(! user) {
			throw ApiError.errorByType('USER_NOT_EXISTS');
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if(!isPasswordValid) {
			throw ApiError.errorByType('USER_NOT_EXISTS');
		}


		return user;
	}

}

export default new AuthService();