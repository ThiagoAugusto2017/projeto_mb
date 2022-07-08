import express from 'express';
import 'dotenv/config';
import config from 'config';

import Logger from '../config/logger';
import morganMiddleware from './middleware/morganMiddleware';
import router from './routes/routes';

const app = express();
app.use(express.json());
app.use(morganMiddleware);

app.use('/', router);

const acesso = {
	PORT_APP: config.get<number>('PORT_APP'),
	PORT: config.get<number>('PORT'),
};

app.listen(acesso.PORT || acesso.PORT_APP, async () => {
	Logger.info(`listening on ${acesso.PORT || acesso.PORT_APP}`);
});
