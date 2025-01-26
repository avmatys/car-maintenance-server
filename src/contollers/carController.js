import { createCarQuery, deleteCarByIdQuery, getCarByOwnerAndVINQuery, getCarsByOwnerQuery, updateCarByIdQuery } from '../queries/carQueries.js';
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
    if (year < model.start_year || year > model.end_year) {
      return res.status(400).json(formErrorResponse('Combination of year and model is not valid'));
    }
    const duplicateCar = await getCarByOwnerAndVINQuery(userId, vin);
    if (duplicateCar) {
      return res.status(400).json(formErrorResponse('User has a car with the same VIN'));
    }
    const car = await createCarQuery(userId, vin, modelId, year, miliage);
    res.status(201).json({ car });
  } catch (err) {
      return res.status(500).json(formErrorResponse ('Error car creation', err.message));
  }
};

export const updateCar = async (req, res) => {
  const { vin, modelId, year, miliage } = req.body;
  const car = req.car;
  if (modelId != car.model_id || year != car.year) {
    const curModelId = modelId ? modelId : car.model_id;
    const model = await getModelByIdQuery(curModelId);
    if (!model) {
      return res.status(400).json(formErrorResponse('Model doesn\' exist'));
    }
    const curYear = year ? year : car.year;
    if (curYear < model.start_year || curYear > model.end_year) {
      return res.status(400).json(formErrorResponse('Combination of year and model is not valid'));
    }
  }

  const updateFields = {}
  if (vin && vin != car.vin) updateFields.vin = vin;
  if (modelId && modelId != car.model_id) updateFields.model_id = modelId;
  if (year && year != car.year) updateFields.year = year;
  if (miliage && miliage != car.miliage) updateFields.miliage = miliage;

  if (Object.keys(updateFields).length == 0) {
    return res.status(400).json(formErrorResponse("No fields to update"));
  }

  try {
    const updatedCar = await updateCarByIdQuery(car.id, updateFields);
    return res.status(200).json({ updatedCar });
  } catch (err) {
    return res.status(500).json(formErrorResponse ('Error car update', err.message));
  }
};

export const deleteCar = async (req, res) => {
  const carId = req.params.carId;
  try {
    await deleteCarByIdQuery(carId);
    res.status(200).json({message: "Car was deleted"});
  } catch(err){
    return res.status(500).json(formErrorResponse ('Error car deletion', err.message));
  }
};

export const getUserCars = async (req, res) => {
  const userId = req.user.userId;
  try {
    const result = await getCarsByOwnerQuery(userId);
    res.status(200).json({ result });
  } catch(err){
    return res.status(500).json(formErrorResponse ('Error reading cars', err.message));
  }
};