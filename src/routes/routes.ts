import {Router} from 'express';
import multer from 'multer';
import {InputLogin} from '../controller/userLogin';
import {InputUsuario} from '../controller/InputUsuario';
import {validate} from '../middleware/handleValidation';
import {userInputValidation} from '../middleware/userLoginValidation';
import authorization from '../middleware/auth';
import {cadastroValidation} from '../middleware/cadastroValidation';
import {Evento} from '../controller/eventos';
import {Costs} from '../controller/costs';
import {EventoPublicoAll} from '../controller/eventosPublico';
import {Ingresso} from '../controller/ingresso';

const router = Router();

router.post('/api/login/cadastro', userInputValidation(), validate, InputLogin.input);
router.post('/api/login', InputLogin.validateSession);

router.post('/api/usuario', cadastroValidation(), authorization.verifyToken, InputUsuario.usuario);

router.post('/api/evento', authorization.verifyToken, Evento.inputEvento);

router.post(
	'/api/evento/upload/:id',
	multer({storage: multer.memoryStorage()}).single('card'),
	authorization.verifyToken,
	Evento.inputEventoCard,
);

router.get('/api/evento', authorization.verifyToken, Evento.allEvent);

router.patch('/api/evento/:id', authorization.verifyToken, Evento.edtEvento);

router.delete('/api/evento/:id', authorization.verifyToken, Evento.deltEvento);

router.post('/api/evento/:id/costs/', authorization.verifyToken, Costs.inputCosts);

router.get('/api/evento/costs/', authorization.verifyToken, Costs.allCosts);

router.get('/api/evento/:id/costs/relatorio', authorization.verifyToken, Costs.relatorioCostos);

router.patch('/api/evento/:id/costs/', authorization.verifyToken, Costs.edtCosts);

router.delete('/api/evento/:id/costs/', authorization.verifyToken, Costs.deltCosts);

router.get('/api/eventos/filtro/', EventoPublicoAll.eventoCidade);

router.get('/api/eventos/filtro/:id/detalhes', EventoPublicoAll.eventodetalhes);

router.get('/api/eventos/filtro/novidades', EventoPublicoAll.eventosUltimosadd);

router.get('/api/eventos/filtro/personalizado', EventoPublicoAll.eventosFiltoPersonalizado);

router.post('/api/eventos/filtro/:id/detalhes/ingresso', authorization.verifyToken, Ingresso.ingressoCompra);

router.post(
	'/api/eventos/filtro/:id/detalhes/ingresso/relatorio',
	authorization.verifyToken,
	Ingresso.ingressoRelatorio,
);

export default router;
