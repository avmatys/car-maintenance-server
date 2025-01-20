import config from '../config/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hashPassword = async (plainPassword) => {
  return bcrypt.hash(plainPassword, config.bcrypt.saltRounds);
};

export const comparePasswords = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export const generateToken = (user) => {
  if (!user) {
      throw new Error('User is required');
  }
  return jwt.sign(user, config.jwt.secret, { expiresIn: config.jwt.expiresIn });    
};

export const getExpirationDate = (token) => {
  if (!token) {
      throw new Error('Token is required');
  }

  const decoded = jwt.decode(token);
  if (decoded && decoded.exp) {
    return new Date(decoded.exp * 1000); 
  } else {
    return undefined;
  }
};

export const verifyJwtToken = (token) => {
  if (!token) {
    throw new Error('Token is required');
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    return decoded;
  } catch (err) {
    throw new Error(`Invalid token: ${err.message}`);
  }
};

export const getTokenFromAuth = (header) => {
  return header.split(' ')[1];
}