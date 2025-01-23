import { getBrandsByYearQuery, getModelsByBrandAndYearQuery } from '../queries/modelQueries.js';
import { formErrorResponse } from '../utils/errorUtils.js';

export const getBrandsByYear = async (req, res) => {
  const { year } = req.query;
  try {
    const brands = await getBrandsByYearQuery(year);
    res.status(200).json({ brands });
  } catch (err) {
    res.status(500).json(formErrorResponse ('Error fetching brands by year', err.message));
  }
};

export const getModelsByBrandAndYear = async (req, res) => {
  const { brandId, year } = req.query;
  try {
    const models = await getModelsByBrandAndYearQuery(brandId, year);
    res.status(200).json({ models });
  } catch (err) {
    res.status(500).json(formErrorResponse ('Error fetching models by year and brand', err.message));
  }
};