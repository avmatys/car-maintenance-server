import { formErrorResponse } from "../utils/errorUtils.js";

export const validateUserId = (req, res, next) => {
  const user = req.user;
  const id = req.params.id;
  if (!user || !user.id || !id) {
    return res.status(403).json(formErrorResponse("Unauthorized. User doesn' exist"));
  }
  if (user.id != id) {
    return res.status(403).json(formErrorResponse(`Unauthorized. User doesn\' have access to user ${id}`));
  }
  next();
};
