import { query } from "../config/db.js";

// Cars
export const createCarQuery = async (modelId, year, miliage, ownerId) => {
  const result = await query(
    `INSERT INTO cars (model_id, year, miliage, owner_id) VALUES ($1, $2, $3, $4) RETURNING *`,
    [modelId, year, miliage, ownerId]
  );
  return result.rows[0];
};
