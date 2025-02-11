import { check, body } from "express-validator";
import { checkValidationErrors } from "../utils/errorUtils.js";
import { getServiceByIdQuery } from "../queries/serviceQueries.js";

export const validateServiceCreation = [
  body("carId")
    .isInt({ min: 1 })
    .withMessage("Car ID must be a valid integer")
    .toInt(),
  body("serviceDate").isISO8601().withMessage("Service date is not valid"),
  body("mileage")
    .isInt({ min: 0 })
    .withMessage("Mileage should be positive number"),
  body("location")
    .optional({ nullable: true })
    .isLength({ min: 1, max: 255 })
    .withMessage("Location max length 255 symbols"),
  // Works section
  body("works")
    .optional({ nullable: true })
    .isArray().withMessage("Works should be an array"),
  body("works.*.description")
    .if(body("works").isArray())
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage("Work description can't be empty or more than 2000 symbols"),
  body("works.*.cost")
    .if(body("works").isArray())
    .isFloat({ min: 0 }).withMessage("Cost should be a positive number"),
  // Spare parts
  body("spareParts")
    .optional({ nullable: true })
    .isArray().withMessage("Spare parts should be an array"),
  body("spareParts.*.name")
    .if(body("spareParts").isArray())
    .trim()
    .isLength({ min: 1, max: 500 }).withMessage("Spare part name can't be empty or more than 500 symbols"),
  body("spareParts.*.number")
    .if(body("spareParts").isArray())
    .optional({ nullable: true })
    .trim()
    .isLength({ min: 1, max: 150 }).withMessage("Spare part number can't be empty or more that 150 symbols"),
  body("spareParts.*.quantity")
    .if(body("spareParts").isArray())
    .isInt({ min: 1 }).withMessage("Quantity should be a positive number"),
  body("spareParts.*.cost")
    .if(body("spareParts").isArray())
    .isFloat({ min: 0 }).withMessage("Price should be a positive number"),

  body().custom((value, { req }) => {
    const works = req.body.works || [];
    const spareParts = req.body.spareParts || [];
    if (works.length === 0 && spareParts.length === 0) {
      throw new Error("At least one work or spare part should be specified");
    }
    return true;
  }),
  (req, res, next) => checkValidationErrors(req, res, next, 400,"Service creation request is not valid"),
];

export const validateServiceId = [
  check("serviceId")
    .isInt({min: 1})
    .withMessage("Service ID must be a valid integer")
    .toInt(),
  (req, res, next) => checkValidationErrors(req, res, next, 400, "Request is not valid"),
];

export const addCarIdFromService = async (req, res, next) => {
  const serviceId = req.params.serviceId;
  try{
    const service = await getServiceByIdQuery(serviceId, ['car_id']);
    if (!service) {
      return res.status(404).json(formErrorResponse("Service doesn't exist"));
    }
    req.params.carId = service.car_id;
    next();
  } catch (err) {
    return res.status(500).json(formErrorResponse("Internal Server Error", err.message));
  }
};

