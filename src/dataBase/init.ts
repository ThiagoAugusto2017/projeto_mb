import userLogin from '../model/userLogin';
import inputUser from '../model/inputUser';
import Logger from '../../config/logger';
import 'dotenv/config';

const criarDatabase = process.env.TABLE_CREATE === 'true';
const isDev = process.env.TABLE === 'development';

const dbInit = () => {
	if (criarDatabase === true) {
		userLogin.sync({alter: isDev});
		inputUser.sync({alter: isDev});

		Logger.info('Table sendo recriadas');
	} else {
		Logger.info('Iniciado sem alteração Table');
	}
};

export default dbInit;
