/* eslint-disable prettier/prettier */
import {DataTypes, Model} from 'sequelize';
import db from '../dataBase/db';
import { TodoAttributes } from '../helpers/types';


class userLogin extends Model<TodoAttributes> {
	public readonly createdAt!: Date;

	public readonly updatedAt!: Date;

	public readonly deletedAt!: Date;
}

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
