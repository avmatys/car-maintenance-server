import { formErrorResponse } from '../utils/errorUtils.js';
import { insertWorkQuery, deleteWorkByIdQuery} from '../queries/workQueries.js';

export const createWork = async (req, res) => {
    const { serviceId, description, cost } = req.body;
    console.log(serviceId)
    try {
        const work = await insertWorkQuery(serviceId, description, cost);
        return res.status(201).json(work);
    } catch (err) {
        return res.status(500).json(formErrorResponse('Error work creation', err.message));
    }
};

export const deleteWork = async (req, res) => {
    const workId = req.params.workId;
    try {
        await deleteWorkByIdQuery(workId);
        res.status(200).json({message: "Work was deleted"});
    } catch(err) {
        return res.status(500).json(formErrorResponse('Error during work deletion', err.message));
    }
}
