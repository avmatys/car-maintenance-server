import { check, validationResult } from "express-validator";
import { verifyJwtToken, verifyTgToken } from "../utils/cryptoUtils.js";
import { formErrorResponse } from "../utils/errorUtils.js";

// Common
export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"].split(' ')[1];
  if (!token) {
    return res.status(401).json(formErrorResponse("Access denied. No token provided"));
  }
  try {
    const decoded = verifyJwtToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json(formErrorResponse("Invalid or expired token"));
  }
};

export const verifyTelegramApiToken = (req, res, next) => {
  const token = req.headers["x-api-key"];
  if (!token) {
    return res.status(401).json(formErrorResponse("Access denied. No API token provided"));
  }
  const isValid = verifyTgToken(token);
  if (!isValid){
    return res.status(403).json(formErrorResponse("Invalid or expired token"));
  }
  next();
};

const checkValidationErrors = (req, res, next, code, errorMsg) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(code).json(formErrorResponse(errorMsg, errors.array()));
  }
  next();
}

// Web login
const validateEmail = check("email")
  .notEmpty()
  .withMessage("Email is required")
  .isEmail()
  .withMessage("Invalid email format");

const validatePassword = check("password")
  .notEmpty()
  .withMessage("Password is required")
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters long");

export const validateWebRegister = [
  validateEmail, 
  validatePassword,
  (req, res, next) => {
    checkValidationErrors(req, res, next, 400, 'Web user registration data is not correct');
    next();
  }
];

export const validateWebLogin = [
  validateEmail, 
  validatePassword,
  (req, res, next) => {
    checkValidationErrors(req, res, next, 400, 'Web user login failed')
  }
];

// Telegram User
const validateTelegramId = check("telegramId")
  .notEmpty()
  .withMessage("Telegram ID is required")
  .isInt({ min: 1 })
  .withMessage("Telegram ID must be a positive int")
  .toInt();

const validateTelegramApiKey = check('x-api-key')
  .notEmpty()
  .withMessage("Telegram API is required")

export const validateTgRegister = [
  validateTelegramId,
  (req, res, next) => {
    checkValidationErrors(req, res, next, 400, 'Tg user registration data is not correct');
  }
];

export const validateTgLogin = [
  validateTelegramId, 
  verifyTelegramApiToken,
  (req, res, next) => {
    checkValidationErrors(req, res, next, 400, 'Tg User login failed');
  }
];
