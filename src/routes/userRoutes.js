import { Router } from 'express';
import { getUserById, registerUser, loginUser } from '../contollers/userController.js';
import { validateRegisterUser, validateLoginUser } from '../middlewares/userValidator.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { validateUserId } from '../middlewares/userValidator.js';

const router = Router();

router.get('/users/:id', verifyToken, validateUserId, getUserById);
router.post('/users/register', validateRegisterUser, registerUser);
router.post('/users/login', validateLoginUser, loginUser);

export default router;
