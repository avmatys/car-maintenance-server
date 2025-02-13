import { check, body } from "express-validator";
import { checkValidationErrors, formErrorResponse } from "../utils/errorUtils.js";
import { getCarIdFromRelatedToSpareServiceQuery } from "../queries/spareQueries.js";

export const validateSpareId = [
  check("spareId")
    .isInt({min: 1})
    .withMessage("Spare Part ID must be a valid integer")
    .toInt(),
  (req, res, next) => checkValidationErrors(req, res, next, 400, "Request is not valid"),
];

export const validateSpareCreation = [
  body("serviceId")
    .isInt({min: 1}) 
    .withMessage("Service ID must be a valid integer")
    .toInt(),
  body("name")
    .isLength({ min: 1, max: 500 })
    .withMessage("Spare part name can't be empty or more than 500 symbols"),
  body("number")
    .optional({ nullable: true })
    .trim()
    .isLength({ min: 1, max: 150 }).withMessage("Spare part number can't be empty or more that 150 symbols"),
  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity should be a positive number"),
  body("cost")
    .isFloat({ min: .0, max: 1e300 })
    .withMessage("Cost must be greater than zero"),
  (req, res, next) => checkValidationErrors(req, res, next, 400, "Spare Part creation request is not valid"),
];

export const addCarIdFromSpare = async (req, res, next) => {
    const spareId = req.params.spareId;
    try{
      const sparePart = await getCarIdFromRelatedToSpareServiceQuery(spareId);
      if (!sparePart) {
        return res.status(400).json(formErrorResponse("Spare part doesn't have related service"));
      }
      req.params.carId = sparePart.car_id;
      next();
    } catch (err) {
      return res.status(500).json(formErrorResponse("Internal Server Error", err.message));
    }
}