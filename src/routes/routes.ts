import {Router} from 'express';
import {InputUser} from '../controller/userLogin';
import {validate} from '../middleware/handleValidation';
import {userInputValidation} from '../middleware/userValidation';

const router = Router();

router.post('/api/user', userInputValidation(), validate, InputUser.input);

export default router;
