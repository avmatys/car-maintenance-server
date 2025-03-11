import { Router } from 'express';
import { createService, getCarSerices, deleteService } from '../contollers/serviceController.js';
import { verifyToken, validateUserIsCarOwner } from '../middlewares/authMiddleware.js';
import { validateServiceCreation, validateServiceId, addCarIdFromService } from '../middlewares/serviceMiddleware.js';
import { validateCarId, validateCarExists} from '../middlewares/carMiddleware.js';

const router = Router();

router.post('/', verifyToken, validateServiceCreation, validateUserIsCarOwner, validateCarExists, createService);
router.get('/cars/:carId', verifyToken, validateCarId, validateUserIsCarOwner, validateCarExists, getCarSerices);
router.delete('/:serviceId', verifyToken, validateServiceId, addCarIdFromService, validateUserIsCarOwner, deleteService);

export default router;