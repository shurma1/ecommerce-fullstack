import {config} from 'dotenv';
config();
import express from 'express';
import cors from 'cors';
import {Logger} from './utils/logger/logger';
import sequelize from './models/db';
import routes from './routes';
import {errorHandlingMiddleware} from './middleware/errorHandling.middleware';
import {fallbackController} from './controllers/fallback.controller';

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(routes);
app.use(fallbackController);
app.use(errorHandlingMiddleware);

const start = async () => {
	try{
		await sequelize.authenticate();
		await sequelize.sync();
		app.listen(PORT, () => Logger.log(`Server started on port: ${PORT}`));

	}
	catch (e){
		Logger.error(e);
		process.exit(1);
	}
};

start();