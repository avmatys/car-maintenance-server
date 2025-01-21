import { check } from "express-validator";
import { verifyJwtToken, getTokenFromAuth } from "../utils/authUtils.js";
import { formErrorResponse } from "../utils/errorUtils.js";

// Common
export const verifyToken = (req, res, next) => {
  const token = getTokenFromAuth(req.headers["authorization"]);
  if (!token) {
    return res
      .status(401)
      .json(formErrorResponse("Access denied. No token provided."));
  }
  try {
    const decoded = verifyJwtToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json(formErrorResponse("Invalid or expired token."));
  }
};

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

export const validateWebRegister = [validateEmail, validatePassword];
export const validateWebLogin = [validateEmail, validatePassword];

// Telegram User
const validateTelegramId = check("telegramId")
  .notEmpty()
  .withMessage("Telegram ID is required")
  .isInt({ min: 1 })
  .withMessage("Telegram ID must be a positive int")
  .toInt();

export const validateTgRegister = [validateTelegramId];
export const validateTgLogin = [validateTelegramId];
