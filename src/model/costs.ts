/* eslint-disable prettier/prettier */
import {DataTypes, Model} from 'sequelize';
import db from '../dataBase/db';
import {RequestBodyCosts, RequestBodyEvento} from '../helpers/types';
import userLogin from './userLogin';
import Evento from "./evento";

class CostsModel extends Model<RequestBodyCosts, RequestBodyEvento> {
	public readonly createdAt!: Date;

	public readonly updatedAt!: Date;

	public readonly deletedAt!: Date;
}

CostsModel.init(
	{
		produtora: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		nomeEvento: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		local: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		valorLocalUnd: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		qtLocal: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		divulgacao: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		decoraIlumina: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		equipamentos: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		alimentacao: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		hospedagem: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		equipe: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		equipeQtd: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		outros: {
			type: DataTypes.FLOAT,
			allowNull: true,
		}
	},
	{
		sequelize: db,
		tableName: 'costos',
	},
);

CostsModel.belongsTo(userLogin, {
	constraints: true,
	foreignKey: 'id_Usuario',
});
CostsModel.belongsTo(Evento, {
	constraints: true,
	foreignKey: 'id_Evento',
});

export default CostsModel;
