import { query } from "express-validator";
import { checkValidationErrors} from "../utils/errorUtils.js";

export const validateYearParam = [ 
  query("year")
    .exists()
    .withMessage("Year parameter is required")
    .isInt()
    .withMessage("Year must be an integer"),
  (req, res, next) => {
    checkValidationErrors(req, res, next, 400, 'Year is mandatory');
  }
];

export const validateBrandIdParam = [
  query("brandId")
    .exists()
    .withMessage("BrandId parameter is required")
    .isInt()
    .withMessage("BrandId must be an integer"),
  (req, res, next) => {
    checkValidationErrors(req, res, next, 400, 'Brand Id is mandatory');
  }
];