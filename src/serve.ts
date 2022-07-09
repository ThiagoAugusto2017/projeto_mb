import express from 'express';
import 'dotenv/config';
import config from 'config';
import db from './dataBase/db';
import Logger from '../config/logger';
import morganMiddleware from './middleware/morganMiddleware';
import router from './routes/routes';
import dbInit from './dataBase/init';

const app = express();
app.use(express.json());
app.use(morganMiddleware);

app.use('/', router);

const acesso = {
	PORT_APP: config.get<number>('PORT_APP'),
	PORT: config.get<number>('PORT'),
};

app.listen(acesso.PORT || acesso.PORT_APP, async () => {
	dbInit();
	await db.sync();
	Logger.info(`listening on ${acesso.PORT || acesso.PORT_APP}`);
});
