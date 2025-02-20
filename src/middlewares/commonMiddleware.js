import { query } from "express-validator";
import { checkValidationErrors} from "../utils/errorUtils.js";
import { getQueryMaxLimit } from "../utils/commonUtils.js";

export const validateQueryParams = [
    query('offset')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Offset must be a non-negative integer')
      .toInt(),  
    query('limit')
      .optional()
      .isInt({ min: 1, max: getQueryMaxLimit() })
      .withMessage(`Limit must be between 1 and ${getQueryMaxLimit()}`)
      .toInt(),
    (req, res, next) => {
      checkValidationErrors(req, res, next, 400, 'Query is not valid');
    }
  ];