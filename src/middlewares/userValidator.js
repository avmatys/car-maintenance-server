import { check } from 'express-validator';
import { formErrorResponse } from '../utils/errorUtils.js';

export const validateEmail = check('email')
  .notEmpty()
  .withMessage('Email is required')
  .isEmail()
  .withMessage('Invalid email format');

export const validatePassword = check('password')
  .notEmpty()
  .withMessage('Password is required')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters long');


export const validateRegisterUser = [
  validateEmail,
  validatePassword
];

export const validateLoginUser = [
  validateEmail,
  validatePassword
];

export const validateUserId = (req, res, next) => {
  const user = req.user;
  const id = req.params.id;
  if (!user || !user.id || !id) {
    return res.status(403).json(formErrorResponse('Unauthorized. User doesn\' exist'));
  }
  if (user.id != id) {
    return res.status(403).json(formErrorResponse(`Unauthorized. User doesn\' have access to user ${id}`));
  } 
  next();
} 