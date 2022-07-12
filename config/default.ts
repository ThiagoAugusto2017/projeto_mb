import 'dotenv/config';

export default {
	PORT: process.env.PORT,
	PORT_APP: process.env.PORT_APP,
	env: 'development',
	secretKey: process.env.SECRETKEY,
	instaciaNotificacao: process.env.INSTANCIA,

	ambiente: {
		development: {
			database: process.env.DATABASE,
			username: process.env.USER,
			password: process.env.PASSWORD,
			host: process.env.HOST,
			port: process.env.PORT_DATA_BASE || 3306,
			dialect: process.env.DIALECT,
			timezone: process.env.TIMEZONE,
		},
		test: {
			database: process.env.DATABASE,
			username: process.env.USER,
			password: process.env.PASSWORD,
			host: process.env.HOST,
			port: process.env.PORT_DATA_BASE || 3306,
			dialect: process.env.DIALECT,
			timezone: process.env.TIMEZONE,
		},
		production: {
			database: process.env.DATABASE,
			username: process.env.USER,
			password: process.env.PASSWORD,
			host: process.env.HOST,
			port: process.env.PORT_DATA_BASE || 3306,
			dialect: process.env.DIALECT,
			timezone: process.env.TIMEZONE,
		},
	},
};
