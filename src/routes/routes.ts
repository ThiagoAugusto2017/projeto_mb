import {Router} from 'express';
import {InputLogin} from '../controller/userLogin';
import {InputUsuario} from '../controller/InputUsuario';
import {validate} from '../middleware/handleValidation';
import {userInputValidation} from '../middleware/userLoginValidation';
import authorization from '../middleware/auth';
import {cadastroValidation} from '../middleware/cadastroValidation';
import {Evento} from '../controller/eventos';
import {Costs} from '../controller/costs';

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

router.post('/api/evento', authorization.verifyToken, Evento.inputEvento);

router.get('/api/evento', authorization.verifyToken, Evento.allEvent);

router.patch('/api/evento/:id', authorization.verifyToken, Evento.edtEvento);

router.delete('/api/evento/:id', authorization.verifyToken, Evento.deltEvento);

router.post(
	'/api/evento/:id/costs/',
	authorization.verifyToken,
	Costs.inputCosts,
);

router.get('/api/evento/costs/', authorization.verifyToken, Costs.allCosts);

router.patch(
	'/api/evento/:id/costs/',
	authorization.verifyToken,
	Costs.edtCosts,
);

router.delete(
	'/api/evento/:id/costs/',
	authorization.verifyToken,
	Costs.deltCosts,
);

export default router;
