import { Router } from 'express';
import { createWork, deleteWork } from '../contollers/workController.js';
import { verifyToken, validateUserIsCarOwner } from '../middlewares/authMiddleware.js';
import { addCarIdFromWork } from '../middlewares/workMiddleware.js'
import { addCarIdFromService } from '../middlewares/serviceMiddleware.js';
import { validateWorkCreation, validateWorkId } from '../middlewares/workMiddleware.js';

const router = Router();

router.post('/', verifyToken, validateWorkCreation, addCarIdFromService, validateUserIsCarOwner, createWork);
router.delete('/:workId', verifyToken, validateWorkId, addCarIdFromWork, validateUserIsCarOwner, deleteWork);

export default router;