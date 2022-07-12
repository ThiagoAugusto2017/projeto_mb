/* eslint-disable no-undef */
import 'dotenv/config';

import axios from 'axios';

import {sendNotificacao} from './notificacao';
import Logger from '../../config/logger';

export async function qrCode(dadosMsg: any) {
	const data = JSON.stringify({
		data: `Numero de autenticação ${dadosMsg.auth}, para o evento ${dadosMsg.nomeEvento}, as ${dadosMsg.dataEvento}`,
		config: {
			logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png',
			cor_qrcode: '#000000',
			cor_fundo_qrcode: '#f9f9f9',
		},
	});

	const configQcode = {
		method: 'post',
		url: 'https://app-qrcode-ofice.herokuapp.com/qrcode',
		headers: {
			'Content-Type': 'application/json',
		},
		data,
	};

	await axios(configQcode)
		.then((response) => {
			try {
				sendNotificacao(
					dadosMsg.telefoneTratado,
					dadosMsg.nomeEvento,
					dadosMsg.dataEvento,
					dadosMsg.horaEvento,
					response.data.Imagem,
				);
			} catch (error) {
				Logger.error('envio de notificação de venda');
			}
		})
		.catch((error) => {
			Logger.error(error);
		});
}
