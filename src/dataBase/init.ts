import userLogin from '../model/userLogin';
import Logger from '../../config/logger';

const criarDatabase = process.env.TABLE_CREATE;
const isDev = process.env.TABLE === 'development';

const dbInit = () => {
	if (criarDatabase === 'true') {
		userLogin.sync({alter: isDev});
	} else {
		Logger.info('Tabelas rodando');
	}
};

export default dbInit;
