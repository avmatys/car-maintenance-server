import { body, validationResult } from "express-validator";
import { checkValidationErrors } from "../utils/errorUtils.js";

export const validateCarCreation = [
  body("modelId").notEmpty().withMessage("Model is required"),
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
