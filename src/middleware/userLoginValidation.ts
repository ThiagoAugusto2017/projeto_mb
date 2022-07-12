/* eslint-disable object-shorthand */
import {check} from 'express-validator';
import userLogin from '../model/userLogin';

export const userInputValidation = () => {
	return [
		check('nome')
			.isString()
			.withMessage('Somente letras')
			.notEmpty()
			.withMessage('Nome obrigatorio')
			.isLength({
				min: 2,
			})
			.withMessage('Favor conferir nome enviado'),
		check('sobrenome')
			.isString()
			.withMessage('Somente letras')
			.notEmpty()
			.withMessage('Sobrenome obrigatorio')
			.isLength({
				min: 5,
			})
			.withMessage('Favor conferir nome enviado'),
		check('email')
			.not()
			.isEmpty()
			.withMessage('Email obrigatorio')
			.isEmail()
			.withMessage('O email nao esta no formato correto ou invalido')
			.custom(async (email: string) => {
				const existingUser = await userLogin.findOne({
					raw: true,
					where: {email: email},
				});

				if (existingUser) {
					throw new Error('Email ja esta em uso, favor cadastrar com outro e-mail;');
				}
			}),
		check('senha')
			.isString()
			.isLength({min: 8})
			.withMessage('Sua senha deve conter numeros, letras e ter no minimo 8 caracteres')
			.not()
			.isLowercase()
			.withMessage('Sua senha deve conter numeros, letras e ter no minimo 8 caracteres')
			.not()
			.isUppercase()
			.not()
			.withMessage('Sua senha deve conter numeros, letras e ter no minimo 8 caracteres')
			.isNumeric()
			.not()
			.isAlpha()
			.withMessage('Sua senha deve conter numeros, letras e ter no minimo 8 caracteres'),
	];
};
