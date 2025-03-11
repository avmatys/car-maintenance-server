import { getAllUsersQuery, getUserByIdQuery } from '../queries/userQueries.js';
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