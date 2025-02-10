import { check, body } from "express-validator";
import { checkValidationErrors, formErrorResponse } from "../utils/errorUtils.js";
import { getCarByIdQuery } from "../queries/carQueries.js";

export const validateCarExists = async (req, res, next) => {
  const carId = req.params.carId || req.body.carId;
  try{
    const car = await getCarByIdQuery(carId);
    if (!car) {
      return res.status(404).json(formErrorResponse("Car doesn't exist"));
    }
    req.car = car;
    next();
  } catch (err) {
    return res.status(500).json(formErrorResponse("Internal Server Error", err.message));
  }
}

export const validateCarId = [
  check("carId")
    .isInt({min: 1})
    .withMessage("Car ID must be a valid integer")
    .toInt(),
  (req, res, next) => checkValidationErrors(req, res, next, 400, "Request is not valid"),
];

export const validateCarCreation = [
  body("modelId")
    .isInt({min: 1}) 
    .withMessage("Model must be a valid integer")
    .toInt(),
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

export const validateCarUpdate = [
  body("modelId")
    .optional()
    .isInt({min: 1}) 
    .withMessage("Model must be a valid integer")
    .toInt(),
  body("vin")
    .optional()
    .isLength({ min: 17, max: 17 })
    .withMessage('VIN must be exactly 17 characters long')
    .matches(/^[A-HJ-NPR-Z0-9]{17}$/)
    .withMessage('VIN contains invalid characters (no I, O, Q allowed)'),
  body("year")
    .optional()
    .isInt({ min: 1886, max: new Date().getFullYear() })
    .withMessage("Year must be a valid year"),
  body("miliage")
    .optional()
    .isInt({ min: 0, max: 99999999 })
    .withMessage("Miliiage is not correct")
    .toInt() 
    .customSanitizer(value => value || null),
  (req, res, next) => checkValidationErrors(req, res, next, 400, "Car update request is not valid"),
]
