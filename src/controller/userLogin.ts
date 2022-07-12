/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import Logger from '../../config/logger';
import userLogin from '../model/userLogin';
import authorization from '../middleware/auth';

export class InputLogin {
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

	static async validateSession(req: Request, res: Response) {
		try {
			const {body} = req;
			type Login = {
				email: string;
				senha: string;
			};
			const dataUser: Login = {
				...body,
			};
			const validadorBanco: any = await userLogin.findOne({
				raw: true,
				where: {
					email: dataUser.email,
				},
			});

			if (validadorBanco === null) {
				return res.status(404).json({notificação: 'Senha ou email estao incorretos'});
			}

			const senhaVerifica: boolean = bcrypt.compareSync(dataUser.senha, validadorBanco.senha);

			console.log(senhaVerifica);

			if (senhaVerifica === true) {
				const dadosToken = authorization.authenticate(validadorBanco.nome, validadorBanco.id, validadorBanco.senha);
				const respostaLogin = {
					auth: true,
					Usuario: `${validadorBanco.nome} ${validadorBanco.sobrenome}`,
					Token: dadosToken,
				};
				return res.status(200).json(respostaLogin);
			}
		} catch (e: any) {
			Logger.error(`Erro no cadastro - Rota - input:${e.message}`);
			return res.status(500).json({
				Erro: 'Por favor, tente mais tarde',
			});
		}
	}
}
