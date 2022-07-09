import {DataTypes, Model} from 'sequelize';
import db from '../dataBase/db';

interface TodoAttributes {
	name: string;
	sobrenome: string;
	email: string;
	senha: string;
}

class userLogin extends Model<TodoAttributes> {}

userLogin.init(
	{
		nome: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		sobrenome: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		senha: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize: db,
		tableName: 'userLogins',
	},
);

export default userLogin;
