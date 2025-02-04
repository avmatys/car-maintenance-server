import { query, beginTransaction, commitTransaction, rollbackTransaction } from "../config/db.js";

export const insertServiceQuery = async (carId, serviceDate, mileage, location, works, spareParts) => {
    let client;
    try {
        client = await beginTransaction();
        const insertService = `
            INSERT INTO services
            (car_id, service_date, mileage, location)
            VALUES 
            ($1, $2, $3, $4)
            RETURNING *;
        `;
        const createdService = await client.query(insertService, [carId, serviceDate, mileage, location]);
        const serviceId = createdService.rows[0].id;
        const createdWorks = []
        const insertWork = `
            INSERT INTO works 
            (service_id, description, cost)
            VALUES 
            ($1, $2, $3)
            RETURNING *;
        `;
        for (const work of works) {
            const createdWork = await client.query(
                insertWork,
                [serviceId, work.description, work.cost]
            );
            createdWorks.push(createdWork.rows[0]);
        }
        const createdParts = []
        const insertSparePart = `
            INSERT INTO spare_parts 
            (service_id, name, number, quantity, cost)
            VALUES 
            ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        for (const part of spareParts) {
            const createdPart = await client.query(
                insertSparePart,
                [serviceId, part.name, part.number, part.quantity, part.cost]
            );
            createdParts.push(createdPart.rows[0]);
        }
        await commitTransaction(client);
        return { ...createdService.rows[0], createdWorks, createdParts };
    } catch (err) {
        if (client) rollbackTransaction(client);
        throw err;
    }
}

export const selectServiceByCarId = async (carId) => {
    const selectQuery = `
        SELECT 
        sr.*,
        COALESCE(
            (SELECT json_agg(sw.*) 
            FROM works sw 
            WHERE sw.service_id = sr.id),
            '[]'
        ) AS works,
        COALESCE(
            (SELECT json_agg(sp.*) 
            FROM spare_parts sp 
            WHERE sp.service_id = sr.id),
            '[]'
        ) AS parts
        FROM services sr
        WHERE sr.car_id = $1
        ORDER BY sr.service_date DESC;
    `;
    const result = await query(selectQuery, [carId]);
    return result.rows;
}
