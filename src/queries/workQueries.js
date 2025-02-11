import { query, beginTransaction, commitTransaction, rollbackTransaction } from "../config/db.js";

export const insertWorkQuery = async (serviceId, description, cost) => {
    const result = await query (
        `INSERT INTO works (service_id, description, cost) VALUES ($1, $2, $3) RETURNING *`,
        [serviceId, description, cost]
    );
    return result.rows[0];
};

export const deleteWorkByIdQuery = async (workId) => {
    await query(`DELETE FROM works WHERE id = $1`, [workId]);
};

export const getCarIdFromRelatedToWorkServiceQuery = async (workId) => {
    const result = await query (
        `SELECT s.car_id FROM works AS w INNER JOIN services AS s ON w.service_id = s.id WHERE w.id = $1 LIMIT 1`,
        [workId]
    );
    return result.rows[0];
};
