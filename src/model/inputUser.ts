/* eslint-disable prettier/prettier */
import {DataTypes, Model} from 'sequelize';
import db from '../dataBase/db';
import userLogin from './userLogin';

interface TodoAttributes {
	rua: string;
	numero: string;
	bairro: string;
	estado: string;
	nacionalidade: string;
	cep: string;
	cpf: number | string;
	rg: string;
	profissao: string;
	produtorEventos: boolean;
}

class InputUsuario extends Model<TodoAttributes> {
	public readonly createdAt!: Date;

	public readonly updatedAt!: Date;

	public readonly deletedAt!: Date;
}

InputUsuario.init(
	{
		rua: {
			type: DataTypes.STRING,
            allowNull: false
		},
		numero: {
			type: DataTypes.STRING,
            allowNull: false
		},
		bairro: {
			type: DataTypes.STRING,
            allowNull: false
		},
		estado: {
			type: DataTypes.STRING,
            allowNull: false
		},
		nacionalidade: {
			type: DataTypes.STRING,
            allowNull: false
		},
		cep: {
			type: DataTypes.STRING,
            allowNull: false
		},
		cpf: {
			type: DataTypes.STRING,
            allowNull: false
		},
		rg: {
			type: DataTypes.STRING,
            allowNull: false
		},
		profissao: {
			type: DataTypes.STRING,
            allowNull: false
		},
		produtorEventos: {
			type: DataTypes.STRING,
            allowNull: false
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

// User.hasMany(Project, {
//     sourceKey: 'id',
//     foreignKey: 'ownerId',
//     as: 'projects', // this determines the name in `associations`!
//   });

// }

export default InputUsuario;
