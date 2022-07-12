/* eslint-disable object-shorthand */
import {body} from 'express-validator';

export const cadastroValidation = [
	body('rua').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('numero').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('bairro').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('estado').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('cidade').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('nacionalidade').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('cep').escape().not().isEmpty().isNumeric().withMessage('Campo Obrigatorio'),

	body('telefone').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('cpf').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('rg').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('profissao').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('produtorEventos').escape().not().isEmpty().withMessage('Campo Obrigatorio'),
];

export const ingressoValidetion = [
	body('nome').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('telefone').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('ingresso').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('precoPago').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('cpf').escape().not().isEmpty().isNumeric().withMessage('Campo Obrigatorio'),
];

export const eventoValidetion = [
	body('produtora').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('nomeEvento').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('local').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('modalidade').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('eventoPagoGratuito').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('categoria').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('descricaoEvento').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('dataHoraInicio').escape().not().isEmpty().withMessage('Campo Obrigatorio, dia e hora'),

	body('dataHoraTermino').escape().not().isEmpty().withMessage('Campo Obrigatorio, dia e hora'),

	body('ingressosTotal').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('preco').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('visibilidade').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('ambiente').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('visibilidade').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('visibilidade').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('rua').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('numero').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('bairro').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('estado').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('cidade').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('cep').escape().not().isEmpty().withMessage('Campo Obrigatorio'),
];
export const costsValidetion = [
	body('produtora').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('nomeEvento').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('local').escape().not().isEmpty().withMessage('Campo Obrigatorio'),

	body('valorLocalUnd').escape().not().isEmpty().isNumeric().withMessage('Campo Obrigatorio'),

	body('qtLocal').escape().not().isEmpty().isNumeric().withMessage('Campo Obrigatorio'),

	body('divulgacao').escape().not().isEmpty().isNumeric().withMessage('Campo Obrigatorio'),

	body('decoraIlumina').escape().not().isEmpty().isNumeric().withMessage('Campo Obrigatorio'),

	body('equipamentos').escape().not().isEmpty().isNumeric().withMessage('Campo Obrigatorio'),

	body('alimentacao').escape().not().isEmpty().isNumeric().withMessage('Campo Obrigatorio'),

	body('hospedagem').escape().not().isEmpty().isNumeric().withMessage('Campo Obrigatorio'),

	body('equipe').escape().not().isEmpty().isNumeric().withMessage('Campo Obrigatorio'),

	body('equipeQtd').escape().not().isEmpty().isNumeric().withMessage('Campo Obrigatorio'),

	body('outros').escape().not().isEmpty().isNumeric().withMessage('Campo Obrigatorio'),
];
