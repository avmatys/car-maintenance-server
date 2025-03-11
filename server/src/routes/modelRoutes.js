import { Router } from 'express';
import { getModelsByBrandAndYear } from '../contollers/modelController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { validateYearParam, validateBrandIdParam } from '../middlewares/modelMiddleware.js';
import { validateQueryParams } from '../middlewares/commonMiddleware.js';

const router = Router();

router.get('/', verifyToken, validateBrandIdParam, validateYearParam, validateQueryParams, getModelsByBrandAndYear);

export default router;
