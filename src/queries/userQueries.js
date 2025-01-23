import {query, beginTransaction, commitTransaction, rollbackTransaction} from "../config/db.js";

// User
export const getAllUsersQuery = async () => {
  const result = await query("SELECT id, email, created_at FROM users");
  return result.rows;
};

export const getUserByIdQuery = async (id) => {
  const result = await query(
    "SELECT id, email, created_at FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

export const createUserQuery = async () => {
  const result = await query(
    "INSERT INTO users DEFAULT VALUES RETURNING id, created_at"
  );
  return result.rows[0];
};

// Web profile
export const createWebProfileQuery = async (email, hashedPassword) => {
  let client;
  try {
    client = await beginTransaction();
    const user = await createUserQuery();
    const result = await query(
      "INSERT INTO web_profiles (user_id, email, password) VALUES ($1, $2, $3) RETURNING id, user_id, email, created_at",
      [user.id, email, hashedPassword]
    );
    await commitTransaction(client);
    return result.rows[0];
  } catch (err) {
    if (client)
      rollbackTransaction(client);
    throw err;
  }  
};

export const getWebProfileByEmailQuery = async (email) => {
  const result = await query(
    "SELECT id, email, password, user_id, created_at FROM web_profiles WHERE email = $1",
    [email]
  );
  return result.rows[0];
};

// Telegram profile
export const createTgProfileQuery = async (telegramId) => {
  let client;
  try {
    client = await beginTransaction();
    const user = await createUserQuery();
    const result = await query(
      "INSERT INTO telegram_profiles (user_id, telegram_id) VALUES ($1, $2) RETURNING id, user_id, telegram_id, created_at",
      [user.id, telegramId]
    );
    await commitTransaction(client);
    return result.rows[0];
  } catch (err) {
    if (client)
      rollbackTransaction(client);
    throw err;
  }  
};

export const getTgProfileByTelegramIdQuery = async (telegramId) => {
  const result = await query(
    "SELECT id, telegram_id, created_at FROM telegram_profiles WHERE telegram_id = $1",
    [telegramId]
  );
  return result.rows[0];
};