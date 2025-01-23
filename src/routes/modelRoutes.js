import { Router } from 'express';
import { getModelsByBrandAndYear } from '../contollers/modelController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { validateYearParam, validateBrandIdParam } from '../middlewares/modelMiddleware.js';

const router = Router();

router.get('/', verifyToken, validateBrandIdParam, validateYearParam, getModelsByBrandAndYear);

export default router;
