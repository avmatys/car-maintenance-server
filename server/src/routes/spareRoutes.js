import { Router } from 'express';
import { createSpare, deleteSpare } from '../contollers/spareController.js';
import { verifyToken, validateUserIsCarOwner } from '../middlewares/authMiddleware.js';
import { addCarIdFromSpare, validateSpareCreation, validateSpareId } from '../middlewares/spareMiddleware.js';
import { addCarIdFromService } from '../middlewares/serviceMiddleware.js';

const router = Router();

router.post('/', verifyToken, validateSpareCreation, addCarIdFromService, validateUserIsCarOwner, createSpare);
router.delete('/:spareId', verifyToken, validateSpareId, addCarIdFromSpare, validateUserIsCarOwner, deleteSpare);

export default router;