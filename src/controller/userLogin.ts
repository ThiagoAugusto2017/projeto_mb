/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import Logger from '../../config/logger';
import userLogin from '../model/userLogin'

export class InputUser {
	static async input(req: Request, res: Response) {
		try {
			const {body} = req;
			type RequestBodyUser = {
				nome: string;
				sobrenome: string;
				email: string;
				senha: any;
			};

			const dataUser: RequestBodyUser = {
				nome: body.nome,
				sobrenome: body.sobrenome,
				email: body.email,
				senha: body.senha,
			};

			const salt = bcrypt.genSaltSync(10);
			const dificultSenha = bcrypt.hashSync(dataUser.senha, salt);
			 dataUser.senha = dificultSenha;

             const dataLogin = await userLogin.create(dataUser);

			return res.status(201).json('Usuario cadastrado');
		} catch (e: any) {
			Logger.error(`Erro no cadastro - Rota - input:${e.message}`);
			return res.status(500).json({
				Erro: 'Por favor, tente mais tarde',
			});
		}
	}
}
