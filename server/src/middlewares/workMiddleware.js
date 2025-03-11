import { check, body } from "express-validator";
import { checkValidationErrors, formErrorResponse } from "../utils/errorUtils.js";
import { getCarIdFromRelatedToWorkServiceQuery } from "../queries/workQueries.js";

export const validateWorkId = [
  check("workId")
    .isInt({min: 1})
    .withMessage("Work ID must be a valid integer")
    .toInt(),
  (req, res, next) => checkValidationErrors(req, res, next, 400, "Request is not valid"),
];

export const validateWorkCreation = [
  body("serviceId")
    .isInt({min: 1}) 
    .withMessage("Service ID must be a valid integer")
    .toInt(),
  body("description")
    .isLength({ min: 1, max: 5000 })
    .withMessage('Description should be not empty'),
  body("cost")
    .isFloat({ min: .0, max: 1e300 })
    .withMessage("Cost must be greater than zero"),
  (req, res, next) => checkValidationErrors(req, res, next, 400, "Car creation request is not valid"),
];

export const addCarIdFromWork = async (req, res, next) => {
    const workId = req.params.workId;
    try{
      const serviceWork = await getCarIdFromRelatedToWorkServiceQuery(workId);
      if (!serviceWork) {
        return res.status(400).json(formErrorResponse("Work doesn't have related service"));
      }
      req.params.carId = serviceWork.car_id;
      next();
    } catch (err) {
      return res.status(500).json(formErrorResponse("Internal Server Error", err.message));
    }
}