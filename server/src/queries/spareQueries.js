import { query, beginTransaction, commitTransaction, rollbackTransaction } from "../config/db.js";

export const insertSpareQuery = async (serviceId, name, number, quantity, cost) => {
    const result = await query (
        `INSERT INTO spare_parts (service_id, name, number, quantity, cost) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [serviceId, name, number, quantity, cost]
    );
    return result.rows[0];
};

export const deleteSpareByIdQuery = async (spareId) => {
    await query(`DELETE FROM spare_parts WHERE id = $1`, [spareId]);
};

export const getCarIdFromRelatedToSpareServiceQuery = async (spareId) => {
    console.log(spareId)
    const result = await query (
        `SELECT s.car_id FROM spare_parts AS sp INNER JOIN services AS s ON sp.service_id = s.id WHERE sp.id = $1 LIMIT 1`,
        [spareId]
    );
    return result.rows[0];
};
