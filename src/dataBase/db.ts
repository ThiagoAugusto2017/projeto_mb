import {Sequelize} from 'sequelize';
import config from 'config';
import Logger from '../../config/logger';

const dadosDb = config.get<string>(`ambiente.${process.env.AMBIENTE}`);

const db = new Sequelize(dadosDb);

try {
	db.authenticate();
	Logger.info('Authenticated  sucess');
} catch (err: any) {
	Logger.error(`nao foi possivel Authenticated${err.message}`);
}

export default db;
