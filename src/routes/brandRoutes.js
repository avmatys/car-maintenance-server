import { Router } from 'express';
import { getBrandsByYear } from '../contollers/modelController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { validateYearParam } from '../middlewares/modelMiddleware.js';

const router = Router();

router.get('/', verifyToken, validateYearParam, getBrandsByYear);

export default router;
