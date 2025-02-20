import { selectBrandsByYearQuery, selectModelsByBrandAndYearQuery } from '../queries/modelQueries.js';
import { formErrorResponse } from '../utils/errorUtils.js';
import { buildSelectParams, defaultSelectParams } from '../utils/commonUtils.js';

export const getBrandsByYear = async (req, res) => {
  const { year, offset, limit } = req.query;
  const params = buildSelectParams({offset, limit});
  try {
    const brands = await selectBrandsByYearQuery({year}, params);
    res.status(200).json({ ...params, data: brands });
  } catch (err) {
    res.status(500).json(formErrorResponse ('Error fetching brands by year', err.message));
  }
};

export const getModelsByBrandAndYear = async (req, res) => {
  const { brandId, year, offset, limit } = req.query;
  const params  = buildSelectParams({offset, limit})
  try {
    const models = await selectModelsByBrandAndYearQuery({brandId, year}, params);
    res.status(200).json({ ...params, data: models });
  } catch (err) {
    res.status(500).json(formErrorResponse ('Error fetching models by year and brand', err.message));
  }
};