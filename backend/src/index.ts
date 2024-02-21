import config from 'config';
import express from 'express';
import cors from 'cors';
import {Logger} from './utils/logger/logger';
import sequelize from './models/db';
import routes from './routes';
import {errorHandlingMiddleware} from './middleware/errorHandling.middleware';
import {fallbackController} from './controllers/fallback.controller';
import fileUpload from 'express-fileupload';
import {devMiddleware} from './middleware/dev.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const PORT = config.get('server.port') || 8000;
const UPLOAD_LIMIT = config.get('file.upload_limit') as number;

const app = express();

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Ecommerce API',
			version: '1.0.0',
			description: ''
		},
		servers: [
			{
				url: `http://localhost:${PORT}`
			}
		]
	},
	apis: ['**/*.ts'],
};

const specs = swaggerJsDoc(options);

app.use(cors());
app.use(express.json());
app.use('/docs', devMiddleware, swaggerUi.serve, swaggerUi.setup(specs));
app.use(fileUpload({
	limits: {
		fileSize: UPLOAD_LIMIT
	}
}));
app.use(express.static('static'));
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