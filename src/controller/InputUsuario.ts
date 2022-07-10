import {Request, Response} from 'express';
import Logger from '../../config/logger';
import InputUser from '../model/inputUser';

export class InputUsuario {
	static async usuario(req: Request, res: Response) {
		try {
			const {body} = req;
			type RequestBodyUsuarioCompleto = {
				rua: String | Number;
				numero: Number | String;
				bairro: String;
				estado: String;
				nacionalidade: String;
				cep: String;
				cpf: Number;
				rg: Number;
				profissao: String;
				produtorEventos: boolean;
				id_Usuario: string;
			};

			const dataUsuario: RequestBodyUsuarioCompleto = {
				...body,
			};

			dataUsuario.id_Usuario = req.user.id;

			const dataLogin = await InputUser.create(dataUsuario);

			console.log(dataLogin);
			return res.status(201).json('Cadastro completo, e atualizado');
		} catch (e: any) {
			Logger.error(`Erro no cadastro - Rota - input:${e.message}`);
			return res.status(500).json({
				Erro: 'Por favor, tente mais tarde',
			});
		}
	}
}
