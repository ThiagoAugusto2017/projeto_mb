/* eslint-disable consistent-return */
import {Response} from 'express';
import axios from 'axios';
import FormData from 'form-data';
import EventoModel from '../model/evento';
import Logger from '../../config/logger';

export function upload(
	image: any,
	idEvent: string,
	IdUser: string,
	res: Response,
) {
	const data = new FormData();
	data.append('image', image);
	const valorRandom = Math.floor(Math.random() * 258425485482655);

	const config = {
		method: 'post',
		url: `https://storage.googleapis.com/upload/storage/v1/b/app_stylos/o?=multipart&name=${valorRandom}.jpg`,
		headers: {
			contentType: 'image/png',
			...data.getHeaders(),
		},
		data,
	};

	axios(config)
		.then(async (response) => {
			if (response.data.name === `${valorRandom}.jpg`) {
				const imagen = `https://storage.googleapis.com/app_stylos/${valorRandom}.jpg`;

				const imageUp = await EventoModel.update(
					{linkCard: imagen},
					{
						where: {
							id: idEvent,
							id_Usuario: IdUser,
						},
					},
				);
				if (!imageUp[0]) {
					return res
						.status(404)
						.json({Notificação: 'Este evento nao pode receber card'});
				}
				return res.status(201).json({Notificação: 'Card inserido com sucesso'});
			}
		})
		.catch((error) => {
			Logger.error({notificação: `Rota -upload imagen ${error.message}`});
		});
}
