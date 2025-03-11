import { formErrorResponse } from '../utils/errorUtils.js';
import { insertServiceQuery, selectServiceByCarId, deleteServiceByIdQuery } from '../queries/serviceQueries.js';
import { buildSelectParams } from '../utils/commonUtils.js';

export const createService = async (req, res) => {
    const { carId, serviceDate, mileage, location, works = [], spareParts = [] } = req.body;
    try {
        const service = await insertServiceQuery(carId, serviceDate, mileage, location, works, spareParts);
        return res.status(201).json(service);
    } catch (err) {
        return res.status(500).json(formErrorResponse('Error service creation', err.message));
    }
};

export const getCarSerices = async (req, res) => {
    const carId = req.params.carId;
    const { offset, limit } = req.query;
    const params = buildSelectParams({offset, limit, orderby: 'service_date', direction: 'DESC'})
    try {
        const plainData = await selectServiceByCarId({carId}, params);
        const serviceRecords = plainData.map(record => ({
            ...record,
            date: record.service_date?.toISOString().split('T')[0],
            works: record.works || [],
            spareParts: record.parts || []
        }));
        return res.status(200).json({...params, data: serviceRecords});
    } catch(err) {
        return res.status(500).json(formErrorResponse('Error during service history read', err.message)); 
    }
};

export const deleteService = async (req, res) => {
    const serviceId = req.params.serviceId;
    try {
        await deleteServiceByIdQuery(serviceId);
        res.status(200).json({message: "Service was deleted"});
    } catch(err) {
        return res.status(500).json(formErrorResponse('Error during service deletion', err.message));
    }
}
