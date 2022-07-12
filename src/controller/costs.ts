/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
import {Request, Response} from 'express';
import { literal } from 'sequelize';
import { validationResult } from 'express-validator';
import Logger from '../../config/logger';
import CostsModel from '../model/costs';
import {RequestBodyCosts, RequestBodyEvento} from '../helpers/types';

export class Costs {
	static async inputCosts(req: Request, res: Response) {
		try {

            const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
				});
			}

			const {body} = req;
			const costsBody: RequestBodyCosts | RequestBodyEvento = {
				...body,
				id_Usuario: req.user.id,
				id_Evento: req.params.id,
				id: req.params.id,
			};

			try {
				const dataEventoBody = await CostsModel.findAndCountAll({
					where: {
						id_Evento: costsBody.id_Evento,
					},
				});
				if (dataEventoBody.count <= 0) {
					await CostsModel.create(costsBody);

					return res.status(201).json({
						Notificação: 'Dados de custo foi registrado para o evento com sucesso',
					});
				}
				return res.status(404).json({
					Notificação: 'Evento ja tem dados de custo, voce pode atualizar o mesmo',
				});
			} catch (error) {
				Logger.error({erro: error});
			}
		} catch (e: any) {
			Logger.error(`Erro no evento - Costs - input:${e.message}`);
			return res.status(404).json({
				Erro: 'Por favor, tente mais tarde',
			});
		}
	}

	static async edtCosts(req: Request, res: Response) {
		const {body} = req;
		const {id} = req.params;

		const costsBody: RequestBodyCosts | RequestBodyEvento = {
			...body,
		};
		try {
			const eventoEdt = await CostsModel.update(costsBody, {
				where: {
					id_Evento: id,
				},
			});

			if (eventoEdt[0] <= 0) {
				return res.status(404).json({
					Notificação: 'Evento nao encontrado',
				});
			}
			return res.status(201).json({
				Notificação: 'Dados de custo foi atualizado com sucesso',
			});
		} catch (e: any) {
			Logger.error(`Erro no custo - Rota - atualizar:${e.message}`);
			return res.status(500).json({
				Erro: 'Por favor, tente mais tarde',
			});
		}
	}

	static async deltCosts(req: Request, res: Response) {
		const idUsuarioAut: string = req.user.id;
		const {id} = req.params;

		try {
			const costsDelet = await CostsModel.destroy({
				where: {
					id,
					id_Usuario: idUsuarioAut,
				},
			});
			console.log(costsDelet);

			if (costsDelet) {
				return res.status(200).json({
					Notificação: 'Dados de custo apagado com sucesso',
				});
			}
			return res.status(404).json({
				Notificação: 'Dados de custo nao encontrado',
			});
		} catch (e: any) {
			Logger.error(`Erro no costs - Rota - deletar:${e.message}`);
			return res.status(500).json({
				Erro: 'Por favor, tente mais tarde',
			});
		}
	}

	static async allCosts(req: Request, res: Response) {
		const idUsuarioAut: string = req.user.id;

		try {
			const costsAll = await CostsModel.findAll({
				where: {
					id_Usuario: idUsuarioAut,
				},
			});

			if (costsAll) {
				return res.status(200).json({
					Notificação: `voce tem ${costsAll.length} planilha de custo registrado`,
					Custos: costsAll,
				});
			}
			return res.status(404).json({
				Notificação: 'Voce nao tem custos cadastrados',
			});
		} catch (e: any) {
			Logger.error(`Erro no costs - Rota - deletar:${e.message}`);
			return res.status(500).json({
				Erro: 'Por favor, tente mais tarde',
			});
		}
	}

    static async relatorioCostos(req: Request, res: Response) {

		try {
			const eventoRegional = await CostsModel.findAll({
                where: {
                    id: req.params.id,
                  },
                  attributes: [
                    'id',
                    'nomeEvento',
                    'divulgacao',
                    'decoraIlumina',
                    'equipamentos',
                    'alimentacao',
                    'hospedagem',
                    'outros',
                    [literal('valorLocalUnd * qtLocal'), 'totalEspaco'],
                    [literal('equipeQtd * equipe'), 'totalEquipe'],
                    [literal('divulgacao + decoraIlumina+equipamentos+alimentacao+hospedagem+outros+(valorLocalUnd * qtLocal)+(equipeQtd * equipe)'), 'Total'],
                  ],
                });

			if (eventoRegional.length > 0) {
				return res.status(200).json(eventoRegional);
			}

			return res.status(404).json({
				Notificação: 'Nenhum relatorio encontrado no filtro',
			});
		} catch (e: any) {
			Logger.error(`Erro no evento - Rota - custo detalhado:${e.message}`);
			return res.status(500).json({
				Erro: 'Por favor, tente mais tarde',
			});
		}
	}


            }