import { createCarQuery } from '../queries/carQueries.js';
import { formErrorResponse } from '../utils/errorUtils.js';

export const createCar = async (req, res) => {
    const { modelId, year, miliage } = req.body;
    const userId = req.user.userId;
    try {  
      const car = await createCarQuery(modelId, year, miliage, userId);
      res.status(201).json({ car });
    } catch (err) {
        res.status(500).json(formErrorResponse ('Error car creation', err.message));
    }
  };