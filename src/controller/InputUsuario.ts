/* eslint-disable no-unused-vars */
import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import Logger from '../../config/logger';
import {RequestBodyUsuarioCompleto} from '../helpers/types';
import InputUser from '../model/inputUser';

export class InputUsuario {
	static async usuario(req: Request, res: Response) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
				});
			}

			const {body} = req;
			const dataUsuario: RequestBodyUsuarioCompleto = {
				...body,
			};

			dataUsuario.id = req.user.id;
			dataUsuario.id_Usuario = req.user.id;

			const dataLogin = await InputUser.create(dataUsuario);

			return res.status(201).json({notificação: 'Cadastro completo, e atualizado'});
		} catch (e: any) {
			Logger.error(`Erro no cadastro - Rota - input:${e.message}`);
			return res.status(500).json({
				Erro: 'Por favor, tente mais tarde',
			});
		}
	}

	static async usuarioEdt(req: Request, res: Response) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
				});
			}

			const {body} = req;

			const dataUsuario: RequestBodyUsuarioCompleto = {
				...body,
			};
			console.log(dataUsuario);

			dataUsuario.id = req.user.id;
			dataUsuario.id_Usuario = req.user.id;

			const dataLogin = await InputUser.update(dataUsuario, {
				where: {
					id: dataUsuario.id,
				},
			});

			return res.status(201).json({notificação: 'Cadastro completo, e atualizado'});
		} catch (e: any) {
			Logger.error(`Erro no cadastro - Rota - input:${e.message}`);
			return res.status(500).json({
				Erro: 'Por favor, tente mais tarde',
			});
		}
	}
}
