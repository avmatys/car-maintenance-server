import { query } from "../config/db.js";

// Get brands by year
export const getBrandsByYearQuery = async (year) => {
  const sqlQquery = `
      SELECT DISTINCT b.id, b.name
      FROM brands b
      JOIN models m ON b.id = m.brand_id
      WHERE m.production_start_year <= $1
        AND (m.production_end_year IS NULL OR m.production_end_year >= $1)
    `;
  const result = await query(sqlQquery, [year]);
  return result.rows;
};

// Models
export const getModelsByBrandAndYearQuery = async (brandId, year) => {
  const sqlQuery = `
    SELECT m.id, m.name, m.production_start_year, m.production_end_year
    FROM models m
    WHERE m.brand_id = $1
      AND m.production_start_year <= $2
      AND (m.production_end_year IS NULL OR m.production_end_year >= $2)
  `;
  const result = await query(sqlQuery, [brandId, year]);
  return result.rows;
};