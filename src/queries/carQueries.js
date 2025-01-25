import { query, beginTransaction, commitTransaction, rollbackTransaction } from "../config/db.js";
import config from "../config/config.js";

// Cars
export const createCarQuery = async (ownerId, vin, modelId, year, miliage) => {
  let client;
  try {
    client = await beginTransaction();
    const car = await query(
      `INSERT INTO cars (vin, model_id, year, miliage) VALUES ($1, $2, $3, $4) RETURNING *`,
      [vin, modelId, year, miliage]
    );
    await query(
      `INSERT INTO car_access (car_id, user_id, role_id) VALUES ($1, $2, $3)`,
      [car.rows[0].id, ownerId, config.roles.owner]
    );
    await commitTransaction(client);
    return car.rows[0];
  } catch (err) {
    if (client) rollbackTransaction(client);
    throw err;
  }
};

export const getCarByOwnerAndVINQuery = async (ownerId, vin) => {
  const result = await query(
    `SELECT c.id, c.model_id, c.year, c.miliage, c.vin
    FROM cars c
    JOIN car_access ca ON c.id = ca.car_id
    WHERE ca.user_id = $1 AND c.vin = $2
    LIMIT 1`,
    [ownerId, vin]
  );
  return result.rows[0];
};
