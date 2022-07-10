/* eslint-disable object-shorthand */
import {body} from 'express-validator';

export const cadastroValidation = () => {
	return [
		body('rua').isLength({
			max: 2,
		}),
		body('bairro')
			.notEmpty()
			.withMessage('Campo obrigatorio')
			.isLength({
				min: 2,
			})
			.withMessage('Favor conferir o endereço'),
		body('estado').trim().notEmpty().withMessage('Campo obrigatorio').isLength({
			min: 2,
		}),
		body('nacionalidade')
			.trim()
			.notEmpty()
			.withMessage('Campo obrigatorio')
			.isLength({
				min: 2,
			}),
		body('cep')
			.trim()
			.notEmpty()
			.withMessage('Campo obrigatorio')
			.isLength({min: 8})
			.isLength({
				max: 8,
			})
			.withMessage('Somente numeros'),
		body('cpf')
			.notEmpty()
			.withMessage('Campo obrigatorio')
			.isLength({min: 11})
			.isLength({
				max: 11,
			})
			.withMessage('Somente numeros'),

		body('numero').notEmpty().withMessage('Campo obrigatorio'),
		body('rg')
			.notEmpty()
			.withMessage('Campo obrigatorio')
			.isLength({
				max: 15,
			})
			.withMessage('Somente numeros'),

		body('profissao')
			.notEmpty()
			.withMessage('Campo obrigatorio')
			.isLength({max: 20}),
		body('produtorEventos')
			.notEmpty()
			.withMessage('Campo obrigatorio')
			.isLength({max: 3})
			.withMessage('sim ou nao'),
	];
};
