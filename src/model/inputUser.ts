/* eslint-disable prettier/prettier */
import {DataTypes, Model} from 'sequelize';
import db from '../dataBase/db';
import {  TodoAttributesCompleto } from '../helpers/types';
import userLogin from './userLogin';



class InputUsuario extends Model<TodoAttributesCompleto> {
	public readonly createdAt!: Date;

	public readonly updatedAt!: Date;

	public readonly deletedAt!: Date;
}

InputUsuario.init(
	{
		rua: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		numero: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		bairro: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		estado: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		nacionalidade: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		cidade: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		cep: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		telefone: {
			type: DataTypes.REAL,
			allowNull: false,
		},
		cpf: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		rg: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		profissao: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		produtorEventos: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize: db,
		tableName: 'cadastro',
	},
);

InputUsuario.belongsTo(userLogin, {
	constraints: true,
	foreignKey: 'id_Usuario',
});



export default InputUsuario;
