import { body } from "express-validator";
import { checkValidationErrors } from "../utils/errorUtils.js";

export const validateCarCreation = [
  body("modelId").notEmpty().withMessage("Model is required"),
  body("vin")
    .isLength({ min: 17, max: 17 })
    .withMessage('VIN must be exactly 17 characters long')
    .matches(/^[A-HJ-NPR-Z0-9]{17}$/)
    .withMessage('VIN contains invalid characters (no I, O, Q allowed)'),
  body("year")
    .isInt({ min: 1886, max: new Date().getFullYear() })
    .withMessage("Year must be a valid year"),
  body("miliage")
    .optional()
    .isInt({ min: 0, max: 99999999 })
    .withMessage("Miliiage is not correct")
    .toInt() 
    .customSanitizer(value => value || null),
  (req, res, next) => checkValidationErrors(req, res, next, 400, "Car creation request is not valid"),
];
