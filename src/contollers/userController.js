import { getAllUsersQuery, getUserByIdQuery, createUserQuery, getUserByEmailQuery } from '../queries/userQueries.js';
import { hashPassword, comparePasswords, generateToken, getExpirationDate } from '../utils/authUtils.js';
import { validationResult } from 'express-validator';
import { formErrorResponse } from '../utils/errorUtils.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersQuery();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(formErrorResponse ('Error fetching users', err.message));
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserByIdQuery(id);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(formErrorResponse(`Error fetching users ${id}`, err.message));
    }
};

export const registerUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(formErrorResponse('User request validation failed', errors.array()));
    }

    const { email, password } = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        const newUser = await createUserQuery(email, hashedPassword);
        const { password: _, ...userWithoutPassword } = newUser;
        res.status(201).json(userWithoutPassword);
    } catch (err) {
        res.status(500).json(formErrorResponse('Error creating user', err.message));
    }
}

export const loginUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(formErrorResponse('User login failed',errors.array));
    }

    const { email, password } = req.body;
    try {
      const user = await getUserByEmailQuery(email); 
      if (!user || !(await comparePasswords(password, user.password))) {
        return res.status(401).json(formErrorResponse('Invalid email or password.'));
      }
      const token = generateToken({ id: user.id, email: user.email });
      res.json({ token, expiration_date: getExpirationDate(token) });
    } catch (err) {
      res.status(500).json(formErrorResponse('Error generating token.',err.message));
    }
  };