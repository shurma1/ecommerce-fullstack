import {ApiError} from '../error/apiError';
import {User} from '../models/model';
import bcrypt from 'bcrypt';

interface IUser {
	email: string;
	password: string;
	name: string;
}

class AuthService {

	async signUp(user: IUser) {
		const {email, password, name} = user;

		const isUserExist = !! await User.findOne({
			where: {
				email: email
			}
		});

		if (isUserExist) {
			throw ApiError.errorByType('USER_ALREADY_EXISTS');
		}

		const hashPassword = await bcrypt.hash(password, 10);

		return  await User.create({
			name,
			email,
			password: hashPassword
		});
	}

	async signIn(user: Omit<IUser, 'name'>){
		const {email, password} = user;

		const userObject = await User.findOne({
			where: {
				email
			}
		});

		if(! userObject) {
			throw ApiError.errorByType('USER_NOT_EXISTS');
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if(!isPasswordValid) {
			throw ApiError.errorByType('USER_NOT_EXISTS');
		}

		return userObject;
	}

}

export default new AuthService();