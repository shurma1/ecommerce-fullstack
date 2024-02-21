import {Sequelize} from 'sequelize';
import config from 'config';

export default new Sequelize(
	config.get('database.name'),
	config.get('database.user'),
	config.get('database.password'),
	{
		dialect: 'postgres',
		host: config.get('database.host'),
		port: config.get('database.port'),
		logging: config.get('database.logging'),
	}
);
