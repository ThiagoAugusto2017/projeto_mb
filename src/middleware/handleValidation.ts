import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';

const validate = (req: Request, res: Response, next: NextFunction) => {
	const erros = validationResult(req);
	if (erros.isEmpty()) {
		return next();
	}

	const extratectErrors: object[] = [];

	erros.array().map((err) =>
		extratectErrors.push({
			[err.param]: err.msg,
		}),
	);

	return res.status(422).json({
		errors: extratectErrors,
	});
};
export default validate;
