import { query } from "../config/db.js";

// Get brands by year
export const getBrandsByYearQuery = async (year) => {
  const sqlQquery = `
      SELECT DISTINCT b.id, b.name
      FROM brands b
      JOIN models m ON b.id = m.brand_id
      WHERE m.start_year <= $1
        AND (m.end_year IS NULL OR m.end_year >= $1)
    `;
  const result = await query(sqlQquery, [year]);
  return result.rows;
};

// Models
export const getModelsByBrandAndYearQuery = async (brandId, year) => {
  const sqlQuery = `
    SELECT m.id, m.name, m.start_year, m.end_year
    FROM models m
    WHERE m.brand_id = $1
      AND m.start_year <= $2
      AND (m.end_year IS NULL OR m.end_year >= $2)
  `;
  const result = await query(sqlQuery, [brandId, year]);
  return result.rows;
};

export const getModelByIdQuery = async(modelId) => {
  const result = await query (`SELECT * FROM models WHERE id = $1`, [modelId]);
  return result.rows[0];
}