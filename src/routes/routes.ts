import {Router} from 'express';
import {InputLogin} from '../controller/userLogin';
import {InputUsuario} from '../controller/InputUsuario';
import {validate} from '../middleware/handleValidation';
import {userInputValidation} from '../middleware/userLoginValidation';
import authorization from '../middleware/auth';
import {cadastroValidation} from '../middleware/cadastroValidation';

const router = Router();

router.post(
	'/api/login/cadastro',
	userInputValidation(),
	validate,
	InputLogin.input,
);
router.post('/api/login', InputLogin.validateSession);

router.post(
	'/api/usuario',
	cadastroValidation(),
	authorization.verifyToken,
	InputUsuario.usuario,
);

export default router;
