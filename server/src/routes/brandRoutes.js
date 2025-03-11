import { Router } from 'express';
import { getBrandsByYear } from '../contollers/modelController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { validateYearParam } from '../middlewares/modelMiddleware.js';
import { validateQueryParams } from '../middlewares/commonMiddleware.js';

const router = Router();

router.get('/', verifyToken, validateYearParam, validateQueryParams, getBrandsByYear);

export default router;
