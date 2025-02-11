import { Router } from 'express';
import { createCar, deleteCar, updateCar, getUserCars } from '../contollers/carController.js';
import { verifyToken, validateUserIsCarOwner } from '../middlewares/authMiddleware.js';
import { validateCarCreation, validateCarId, validateCarExists} from '../middlewares/carMiddleware.js';

const router = Router();

router.post('/', verifyToken, validateCarCreation, createCar);
router.delete('/:carId', verifyToken, validateCarId, validateUserIsCarOwner, deleteCar);
router.patch('/:carId', verifyToken, validateCarId, validateUserIsCarOwner, validateCarExists, updateCar)
router.get('/', verifyToken, getUserCars)

export default router;
