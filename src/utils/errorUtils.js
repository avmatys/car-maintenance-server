import { validationResult } from "express-validator";

export const formErrorResponse = (message, details = []) => {
    return {
        error : {
            message : message,
            details : Array.isArray(details) ? details : [details],
        }
    };
}

export const checkValidationErrors = (req, res, next, code, errorMsg) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(code).json(formErrorResponse(errorMsg, errors.array()));
  }
  next();
}