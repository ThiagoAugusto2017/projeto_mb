/* eslint-disable prettier/prettier */
import {DataTypes, Model} from 'sequelize';
import db from '../dataBase/db';
import {RequestBodyEvento, RequestBodyUsuarioCompleto} from '../helpers/types';
import userLogin from './userLogin';

class EventoModel extends Model<RequestBodyEvento, RequestBodyUsuarioCompleto> {
	public readonly createdAt!: Date;

	public readonly updatedAt!: Date;

	public readonly deletedAt!: Date;
}

EventoModel.init(
	{
		produtora: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		nomeEvento: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		link: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		modalidade: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		eventoPagoGratuito: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		categoria: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		descricaoEvento: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		dataHoraInicio: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		dataHoraTermino: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		ingressosQtd: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		preco: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		visibilidade: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ambiente: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		rua: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		numero: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		bairro: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		estado: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		cidade: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		cep: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		sequelize: db,
		tableName: 'eventos',
	},
);

EventoModel.belongsTo(userLogin, {
	constraints: true,
	foreignKey: 'id_Usuario',
});

export default EventoModel;
