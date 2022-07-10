/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import logger from '../../config/logger';

class authorization {
	static authenticate(nome: string, id: string, senha: string) {
		try {
			const valores = {
				nome,
				id,
				senha,
			};

			const secretKey: string = config.get<string>('secretKey');

			const token = jwt.sign(valores, secretKey, {
				subject: id.toString(),
				expiresIn: 2000,
			});
			return token;
		} catch (err) {
			logger.error('Erro na build do token');
		}
	}

	static verifyToken(req: Request, res: Response, next: NextFunction) {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return res.status(401).json({error: 'Nao autorizado'});
		}

		try {
			const secretKey: string = config.get<string>('secretKey');
			const tokenTratado: string = authHeader.split(' ').pop() as string;

			const decode = jwt.verify(tokenTratado, secretKey);
			const {sub} = decode;
			req.user = {id: sub};

			return next();
		} catch (error: any) {
			return res.status(401).json('Nao autorizado');
		}
	}
}

export default authorization;
