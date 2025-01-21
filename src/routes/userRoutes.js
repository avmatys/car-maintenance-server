import { Router } from 'express';
import { getUserById } from '../contollers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { validateUserId } from '../middlewares/userValidator.js';

const router = Router();

router.get('/:id', verifyToken, validateUserId, getUserById);

export default router;
