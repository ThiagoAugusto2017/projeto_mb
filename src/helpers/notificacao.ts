/* eslint-disable no-unused-vars */
/* eslint-disable no-template-curly-in-string */
import 'dotenv/config';
import config from 'config';
import axios from 'axios';
import Logger from '../../config/logger';

export function sendNotificacao(
	telefone: string,
	nomeEvento: string,
	dataEvento: string,
	horaEvento: string,
	urlQRCode: string,
) {
	const telefoneBruto = telefone.substr(4);
	const dddNumero = telefone.substr(2, 2);
	let telefoneFormatado;

	if (telefone.length <= 8) {
		telefoneFormatado = `55${dddNumero}${9}${telefoneBruto}`;
	} else {
		telefoneFormatado = `55${dddNumero}${telefoneBruto}`;
	}
	const instance = config.get<string>('instaciaNotificacao');
	console.log(telefoneFormatado);
	const data = {
		messageData: {
			to: telefoneFormatado,
			url: urlQRCode,
			type: 'image',
			caption: `🎉🎉 Ola a sua compra foi efetivada com sucesso, para o evento * ${nomeEvento} *, no dia *${dataEvento} as ${horaEvento} horas,*\n acima esta o seu QrCode para a sua autenticação na entrada do evento. Muito obrigado pela compra; \n Mais informaçoes acesse a nossa pagina;`,
			mimeType: 'image/jpeg',
		},
	};
	const configAxios = {
		method: 'post',
		url: `http://64.227.111.41:3075/rest/sendMessage/${instance}/mediaUrl`,
		headers: {
			'Content-Type': 'application/json',
		},
		data,
	};
	axios(configAxios)
		.then(async (response) => {})
		.catch((err) => {
			Logger.error(err);
		});
}
