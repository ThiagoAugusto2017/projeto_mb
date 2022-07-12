/* eslint-disable prettier/prettier */
import {DataTypes, Model} from 'sequelize';
import db from '../dataBase/db';
import {RequestBodyCosts, RequestBodyEvento} from '../helpers/types';
import userLogin from './userLogin';
import Evento from './evento';

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
			type: DataTypes.STRING,
			allowNull: false,
		},
		valorLocalUnd: {
			type: DataTypes.REAL,
			allowNull: false,
		},
		qtLocal: {
			type: DataTypes.REAL,
			allowNull: false,
		},
		divulgacao: {
			type: DataTypes.REAL,
			allowNull: false,
		},
		decoraIlumina: {
			type: DataTypes.REAL,
			allowNull: false,
		},
		equipamentos: {
			type: DataTypes.REAL,
			allowNull: false,
		},
		alimentacao: {
			type: DataTypes.REAL,
			allowNull: false,
		},
		hospedagem: {
			type: DataTypes.REAL,
			allowNull: false,
		},
		equipe: {
			type: DataTypes.REAL,
			allowNull: false,
		},
		equipeQtd: {
			type: DataTypes.REAL,
			allowNull: false,
		},
		outros: {
			type: DataTypes.REAL,
			allowNull: false,
		},
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
