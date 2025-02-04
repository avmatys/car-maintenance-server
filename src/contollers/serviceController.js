import { formErrorResponse } from '../utils/errorUtils.js';
import { insertServiceQuery, selectServiceByCarId } from '../queries/serviceQueries.js';

export const createService = async (req, res) => {
    const { carId, serviceDate, mileage, location, works = [], spareParts = [] } = req.body;
    try {
        const service = await insertServiceQuery(carId, serviceDate, mileage, location, works, spareParts);
        return res.status(201).json(service);
    } catch (err) {
        return res.status(500).json(formErrorResponse('Error service creation', err.message));
    }
};

export const getServiceById = async (req, res) => {
    res.status(501);
}

export const getCarSericeHistory = async (req, res) => {
    const carId = req.params.carId;
    try {
        const plainData = await selectServiceByCarId(carId);
        const serviceRecords = plainData.map(record => ({
            ...record,
            date: record.service_date?.toISOString().split('T')[0],
            works: record.works || [],
            spareParts: record.parts || []
        }));
        return res.status(200).json(serviceRecords);
    } catch(err) {
        return res.status(500).json(formErrorResponse('Error during service history read', err.message)); 
    }
}
