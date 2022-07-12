/* eslint-disable prettier/prettier */
import {DataTypes, Model} from 'sequelize';
import db from '../dataBase/db';
import {RequestBodyEvento, RequestBodyUsuarioCompleto} from '../helpers/types';
import userLogin from './userLogin';

class EventoModel extends Model<RequestBodyEvento , RequestBodyUsuarioCompleto> {
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
		local: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		linkEvento: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		linkCard: {
			type: DataTypes.TEXT,
			allowNull: false,
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
			allowNull: false,
		},
		dataHoraInicio: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		dataHoraTermino: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		ingressosTotal: {
			type: DataTypes.REAL,
			allowNull: false,
		},
		ingressosDisponiveis: {
			type: DataTypes.REAL,
			allowNull: false,
		},
		ingressosVendidos: {
			type: DataTypes.REAL,
			allowNull: false,
		},
		preco: {
			type: DataTypes.REAL,
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
			allowNull: false,
		},
		numero: {
			type: DataTypes.REAL,
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
		cidade: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		cep: {
			type: DataTypes.REAL,
			allowNull: false,
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
userLogin.hasMany(EventoModel,{
	constraints: true,
	foreignKey: 'id_Usuario'});




export default EventoModel;
