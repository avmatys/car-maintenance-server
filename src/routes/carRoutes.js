import { Router } from 'express';
import { createCar } from '../contollers/carController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { validateCarCreation } from '../middlewares/carMiddleware.js';

const router = Router();

router.post('/create', verifyToken, validateCarCreation, createCar);

export default router;
