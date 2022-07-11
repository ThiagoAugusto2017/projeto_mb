/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
import {Request, Response} from 'express';
import {Op, WhereOptions} from 'sequelize';
import Logger from '../../config/logger';
import {RequestBodyEvento} from '../helpers/types';
import EventoModel from '../model/evento';

export class EventoPublicoAll {
	static async eventoCidade(req: Request, res: Response) {
		const {search} = req.query;

		try {
			const eventoRegional = await EventoModel.findAll({
				raw: true,
				where: {
					estado: {
						[Op.like]: `%${search}%`,
					},
				},
				attributes: [
					'id',
					'nomeEvento',
                    'linkCard',
                    'local',
					'dataHoraInicio',
					'dataHoraTermino',
					'cidade',
					'estado',
				],
			});

			if (eventoRegional.length > 0) {
				return res.status(200).json(eventoRegional);
			}

			return res.status(404).json({
				Notificação: 'Nenhum evento encontrado no filtro',
			});
		} catch (e: any) {
			Logger.error(`Erro no evento - Rota - pesquisa regional:${e.message}`);
			return res.status(500).json({
				Erro: 'Por favor, tente mais tarde',
			});
		}
	}

	static async eventodetalhes(req: Request, res: Response) {
		const {id} = req.params;

		try {
			const eventoRegionaldDetalhado = await EventoModel.findOne({
				raw: true,
				where: {
					id,
				},
				attributes: [
					'produtora',
					'nomeEvento',
                    'linkCard',
                    'local',
					'dataHoraInicio',
					'dataHoraTermino',
					'cidade',
					'estado',
					'bairro',
					'modalidade',
					'eventoPagoGratuito',
					'categoria',
					'descricaoEvento',
					'preco',
					'visibilidade',
					'ambiente',
				],
			});
			if (eventoRegionaldDetalhado) {
				return res.status(200).json(eventoRegionaldDetalhado);
			}

			return res.status(404).json({
				Notificação: 'Evento não encontrado no filtro',
			});
		} catch (e: any) {
			Logger.error(`Erro no evento - Rota - pesquisa regional:${e.message}`);
			return res.status(500).json({
				Erro: 'Por favor, tente mais tarde',
			});
		}
	}

	static async eventosUltimosadd(req: Request, res: Response) {
		const {id} = req.params;

		try {
			const eventosUltimosadd = await EventoModel.findAll({
				raw: true,
				where: {
					dataHoraInicio: {
						[Op.lt]: new Date(),
						[Op.gt]: new Date(+new Date() + 1000 * 60 * 60 * 48),
					},
				},
				attributes: [
					'id',
					'nomeEvento',
                    'linkCard',
					'dataHoraInicio',
					'dataHoraTermino',
                    'local',
					'cidade',
					'estado',
				],
			});
			if (eventosUltimosadd[0]) {
				return res.status(200).json(eventosUltimosadd);
			}

			return res.status(404).json({
				Notificação: 'Evento não encontrado no filtro',
			});
		} catch (e: any) {
			Logger.error(`Erro no evento - Rota - pesquisa regional:${e.message}`);
			return res.status(500).json({
				Erro: 'Por favor, tente mais tarde',
			});
		}
	}

	static async eventosFiltoPersonalizado(req: Request, res: Response) {
        const {nomeEvento, modalidade, categoria, preco, cidade, produtora} =
            req.query;
        const filtro: RequestBodyEvento = {};
        if (nomeEvento) filtro.nomeEvento = nomeEvento as string;
        if (modalidade) filtro.modalidade = modalidade as string;
        if (categoria) filtro.categoria = categoria as string;
        if (preco) filtro.preco = preco as any;
        if (cidade) filtro.cidade = cidade as any;
        if (produtora) filtro.produtora = produtora as string;
			try {

			console.log(filtro);
			const eventosFiltoPersonalizado = await EventoModel.findAll({
				raw: true,
				where:filtro as WhereOptions,
                attributes: [
					'id',
					'nomeEvento',
                    'local',
                    'linkCard',
					'dataHoraInicio',
					'dataHoraTermino',
                    'descricaoEvento',
                    'modalidade',
                    'preco',
					'cidade',
					'estado',
				],
			});

			if (eventosFiltoPersonalizado[0]) {
				return res.status(200).json(eventosFiltoPersonalizado);
			}
			return res.status(404).json({
				Notificação: 'Evento não encontrado no filtro',
			});
		} catch (e: any) {
			Logger.error(`Erro no evento - Rota - pesquisa regional:${e.message}`);
			return res.status(500).json({
				Erro: 'Por favor, tente mais tarde',
			});
		}
	}
}
