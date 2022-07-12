/* eslint-disable prettier/prettier */
import {DataTypes, Model} from 'sequelize';
import db from '../dataBase/db';
import {RequestBodyEvento, RequestBodyIngresso} from '../helpers/types';
import userLogin from './userLogin';
import EventoModel from './evento';

class IngressoModel extends Model<RequestBodyIngresso, RequestBodyEvento> {
	public readonly createdAt!: Date;

	public readonly updatedAt!: Date;

	public readonly deletedAt!: Date;
}

IngressoModel.init(

	{

	cpf: {
			type: DataTypes.REAL,
			allowNull: false,
		},

	nome: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	telefone: {
			type: DataTypes.REAL,
			allowNull: false,
		},
		ingresso: {
			type: DataTypes.REAL,
			allowNull: false,
		},
		precoPago: {
			type: DataTypes.REAL,
			allowNull: false,
		},
		protocoAutenticado: {
			type: DataTypes.REAL,
			allowNull: false,
		},

	},
	{
		sequelize: db,
		tableName: 'ingressos',
	},
);

IngressoModel.belongsTo(userLogin, {
	constraints: true,
	foreignKey: 'id_Usuario',
});

IngressoModel.belongsTo(EventoModel, {
	constraints: true,
	foreignKey: 'id_Evento',
});


export default IngressoModel;
