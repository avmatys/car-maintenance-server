import { Router } from 'express';
import { createService, getCarSericeHistory } from '../contollers/serviceController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { validateServiceCreation } from '../middlewares/serviceMiddleware.js';
import { validateCarId, validateUserIsCarOwner, validateCarExists} from '../middlewares/carMiddleware.js';

const router = Router();

router.post('/', verifyToken, validateServiceCreation, validateUserIsCarOwner, validateCarExists, createService);
router.get('/cars/:carId', verifyToken, validateCarId, validateUserIsCarOwner, validateCarExists, getCarSericeHistory);

export default router;