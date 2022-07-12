/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import {Request, Response} from 'express';
import moment from 'moment';
import Logger from '../../config/logger';
import EventoModel from '../model/evento';
import {RequestBodyEvento, RequestBodyUsuarioCompleto} from '../helpers/types';
import {upload} from '../middleware/inputCard';

export class Evento {
	static async inputEvento(req: Request, res: Response) {
		try {
			const {body} = req;
			const eventoBody: RequestBodyEvento | RequestBodyUsuarioCompleto = {
				nomeEvento: body.nomeEvento,
				produtora: body.produtora,
				local: body.local,
				categoria: body.categoria,
				tema: body.tema,
				linkEvento: body.linkEvento,
				linkCard: body.linkCard,
				modalidade: body.modalidade,
				eventoPagoGratuito: body.eventoPagoGratuito,
				descricaoEvento: body.descricaoEvento,
				dataHoraInicio: body.dataHoraInicio,
				dataHoraTermino: body.dataHoraTermino,
				ingressosTotal: body.ingressosTotal,
				ingressosDisponiveis: body.ingressosTotal,
				ingressosVendidos: 0,
				preco: body.preco,
				visibilidade: body.visibilidade,
				ambiente: body.ambiente,
				rua: body.rua,
				numero: body.numero,
				bairro: body.bairro,
				cidade: body.cidade,
				estado: body.estado,
				cep: body.cep,
				id_Usuario: req.user.id,
			};

			const dataEvento = await EventoModel.create(eventoBody);

			return res
				.status(201)
				.json({Notificação: 'Evento registrado com sucesso'});
		} catch (e: any) {
			Logger.error(`Erro no evento - Rota - cadastro:${e.message}`);
			return res.status(500).json({
				Erro: 'Por favor, tente mais tarde',
			});
		}
	}

	static async inputEventoCard(req: Request, res: Response) {
		try {
			const idEvent = req.params.id;
			const IdUser = req.user.id;
			const imagenBuffer = req.file?.buffer;
			upload(imagenBuffer, idEvent, IdUser, res);
		} catch (e: any) {
			Logger.error(`Erro no evento - Rota - cadastro:${e.message}`);
			return res.status(500).json({
				Erro: 'Por favor, tente mais tarde',
			});
		}
	}

	static async edtEvento(req: Request, res: Response) {
		const {body} = req;
		const {id} = req.params;
		const dataedt: RequestBodyEvento | RequestBodyUsuarioCompleto = {...body};

		try {
			const eventoEdt = await EventoModel.update(dataedt, {
				where: {
					id,
				},
			});
			console.log(eventoEdt);
			if (eventoEdt[0] > 0) {
				return res.status(201).json({
					Notificação: 'Evento atualizado com sucesso',
				});
			}
			return res.status(404).json({
				Notificação: 'Evento nao encontrado',
			});
		} catch (e: any) {
			Logger.error(`Erro no evento - Rota - atualizar:${e.message}`);
			return res.status(500).json({
				Erro: 'Por favor, tente mais tarde',
			});
		}
	}

	static async deltEvento(req: Request, res: Response) {
		const idUsuarioAut: string = req.user.id;
		const {id} = req.params;

		try {
			const eventoDelet = await EventoModel.destroy({
				where: {
					id,
					id_Usuario: idUsuarioAut,
				},
			});

			if (eventoDelet) {
				return res.status(200).json({
					Notificação: 'Evento apagado com sucesso',
				});
			}
			return res.status(404).json({
				Notificação: 'Evento nao encontrado',
			});
		} catch (e: any) {
			Logger.error(`Erro no evento - Rota - deletar:${e.message}`);
			return res.status(500).json({
				Erro: 'Por favor, tente mais tarde',
			});
		}
	}

	static async allEvent(req: Request, res: Response) {
		const idUsuarioAut: string = req.user.id;

		try {
			const eventoAll = await EventoModel.findAll({
				where: {
					id_Usuario: idUsuarioAut,
				},
			});

			if (eventoAll) {
				return res.status(200).json({
					Notificação: `voce tem ${eventoAll.length} eventos registrado`,
					Eventos: eventoAll,
				});
			}
			return res.status(404).json({
				Notificação: 'Voce nao tem eventos cadastrados',
			});
		} catch (e: any) {
			Logger.error(`Erro no evento - Rota - deletar:${e.message}`);
			return res.status(500).json({
				Erro: 'Por favor, tente mais tarde',
			});
		}
	}
}
