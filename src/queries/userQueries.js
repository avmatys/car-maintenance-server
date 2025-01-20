import pool from '../config/db.js';

// Get all users
export const getAllUsersQuery = async () => {
  const result = await pool.query('SELECT id, email, created_at FROM users');
  return result.rows;
};

// Get a user by ID
export const getUserByIdQuery = async (id) => {
  const result = await pool.query('SELECT id, email, created_at FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

// Create a new user
export const createUserQuery = async (email, hashedPassword) => {
  const result = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
    [email, hashedPassword]
  );
  return result.rows[0];
};

// Get a user by email
export const getUserByEmailQuery = async (email) => {
  const result = await pool.query('SELECT id, email, password, created_at FROM users WHERE email = $1', [email]);
  return result.rows[0];
};