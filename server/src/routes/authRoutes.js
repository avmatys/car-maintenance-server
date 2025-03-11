import { Router } from 'express';
import { registerWebUser, loginWebUser, registerTgUser, loginTgUser } from '../contollers/authController.js';
import { validateWebLogin, validateWebRegister, validateTgLogin, validateTgRegister } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/web/register', validateWebRegister, registerWebUser);
router.post('/web/login', validateWebLogin, loginWebUser);
router.post('/tg/register', validateTgRegister, registerTgUser);
router.post('/tg/login', validateTgLogin, loginTgUser);

export default router;
