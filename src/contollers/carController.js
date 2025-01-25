import { createCarQuery, getCarByOwnerAndVINQuery } from '../queries/carQueries.js';
import { getModelByIdQuery } from '../queries/modelQueries.js';
import { formErrorResponse } from '../utils/errorUtils.js';

export const createCar = async (req, res) => {
    const { vin, modelId, year, miliage } = req.body;
    const userId = req.user.userId;
    try { 
      const model = await getModelByIdQuery(modelId);
      if (!model) {
        return res.status(400).json(formErrorResponse('Model doesn\' exist'));
      }
      const duplicateCar = await getCarByOwnerAndVINQuery(modelId, vin);
      if (duplicateCar) {
        return res.status(400).json(formErrorResponse('User has a car with the same VIN'));
      }
      const car = await createCarQuery(userId, vin, modelId, year, miliage);
      res.status(201).json({ car });
    } catch (err) {
        res.status(500).json(formErrorResponse ('Error car creation', err.message));
    }
  };