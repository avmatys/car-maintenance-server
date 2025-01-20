import { verifyJwtToken, getTokenFromAuth } from '../utils/authUtils.js';
import { formErrorResponse } from '../utils/errorUtils.js';

export const verifyToken = (req, res, next) => {
  const token = getTokenFromAuth(req.headers['authorization']);
  if (!token) {
    return res.status(401).json(formErrorResponse('Access denied. No token provided.'));
  }

  try {
    const decoded = verifyJwtToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json(formErrorResponse('Invalid or expired token.'));
  }
};


