import { formErrorResponse } from '../utils/errorUtils.js';
import { insertSpareQuery, deleteSpareByIdQuery } from '../queries/spareQueries.js';

export const createSpare = async (req, res) => {
    const { serviceId, name, number, quantity, cost } = req.body;
    try {
        const spare = await insertSpareQuery(serviceId, name, number, quantity, cost);
        return res.status(201).json(spare);
    } catch (err) {
        return res.status(500).json(formErrorResponse('Error spare part creation', err.message));
    }
};

export const deleteSpare = async (req, res) => {
    const spareId = req.params.spareId;
    try {
        await deleteSpareByIdQuery(spareId);
        res.status(200).json({message: "Spare part was deleted"});
    } catch(err) {
        return res.status(500).json(formErrorResponse('Error during spare part deletion', err.message));
    }
}
