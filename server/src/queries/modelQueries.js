import { query } from "../config/db.js";

export const selectBrandsByYearQuery = async (data, params) => {
  const sqlQquery = `
      SELECT DISTINCT b.id, b.name
      FROM brands b
      JOIN models m ON b.id = m.brand_id
      WHERE m.start_year <= $1
        AND (m.end_year IS NULL OR m.end_year >= $1)
      ORDER BY b.${params.orderby} ${params.direction}
      LIMIT ${params.limit} OFFSET ${params.offset}
    `;
  const result = await query(sqlQquery, [data.year]);
  return result.rows;
};

export const selectModelsByBrandAndYearQuery = async (data, params) => {
  const sqlQuery = `
    SELECT id, name, start_year, end_year
    FROM models
    WHERE brand_id = $1
      AND start_year <= $2
      AND (end_year IS NULL OR end_year >= $2)
    ORDER BY ${params.orderby} ${params.direction}
    LIMIT ${params.limit} OFFSET ${params.offset} 
  `;
  const result = await query(sqlQuery, [data.brandId, data.year]);
  return result.rows;
};

export const selectModelByIdQuery = async(modelId) => {
  const result = await query (`SELECT * FROM models WHERE id = $1 LIMIT 1`, [modelId]);
  return result.rows[0];
}