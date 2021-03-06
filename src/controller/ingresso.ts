/* eslint-disable no-unused-vars */
import {Request, Response} from 'express';
import moment from 'moment';
import {validationResult} from 'express-validator';
import {qrCode} from '../helpers/qrCode';
import Logger from '../../config/logger';
import {sendNotificacao} from '../helpers/notificacao';
import {RequestBodyIngresso, RequestBodyUsuarioCompleto, TodoAttributesEvento} from '../helpers/types';
import EventoModel from '../model/evento';
import IngressoModel from '../model/ingressos';

export class Ingresso {
	static async ingressoCompra(req: Request, res: Response) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
			});
		}
		const {body} = req;
		const {id} = req.params;
		const IngressoBory: RequestBodyIngresso | TodoAttributesEvento | RequestBodyUsuarioCompleto = {
			ingresso: body.ingresso,
			precoPago: body.precoPago,
			nome: body.nome,
			cpf: body.cpf,
			telefone: body.telefone,
			protocoAutenticado: Math.floor(Math.random() * 258425485482655),
			id_Usuario: req.user.id,
			id_Evento: id,
		};

		await IngressoModel.create(IngressoBory);
		const ingressoIncremento = body.ingresso;

		EventoModel.increment({ingressosVendidos: ingressoIncremento}, {where: {id}});
		EventoModel.increment({ingressosDisponiveis: -ingressoIncremento}, {where: {id}});
		const dadosEvento = await EventoModel.findByPk(id);

		const dadosMsg = {
			telefoneTratado: `55${parseInt(IngressoBory.telefone, 10)}`,
			dataEvento: moment().format('DD-MM', dadosEvento.dataHoraInicio),
			nomeEvento: dadosEvento.nomeEvento,
			horaEvento: moment().format('h:mm', dadosEvento.dataHoraInicio),
			auth: IngressoBory.protocoAutenticado,
		};
		console.log(IngressoBory);
		try {
			await qrCode(dadosMsg);
		} catch (error) {
			Logger.error('Erro na geração de QRcode');
		}

		return res.status(200).json({Norificação: 'Compra efetivada'});
	}

	static async ingressoRelatorio(req: Request, res: Response) {
		const {body} = req;
		const {id} = req.params;
		console.log(id);
		try {
			const ingressoRelatorio = await IngressoModel.findAll({
				raw: true,
				where: {
					id_Evento: id,
				},
				attributes: ['nome', 'telefone', 'ingresso', 'protocoAutenticado'],
			});
			if (ingressoRelatorio) {
				return res.status(200).json(ingressoRelatorio);
			}

			return res.status(404).json({
				Notificação: 'Evento não encontrado no filtro',
			});
		} catch (e: any) {
			Logger.error(`Erro no evento - Rota - pesquisa relatorio:${e.message}`);
			return res.status(500).json({
				Erro: 'Por favor, tente mais tarde',
			});
		}
	}
}
