import config from "../config/config.js";

export const defaultSelectParams = () => {
    return {offset: 0, limit: config.query.defualtLimit, orderby: 'id', direction: 'ASC'};
};

export const buildSelectParams = ({offset, limit, orderby, direction}) => {
    return { 
        offset: offset || 0, 
        limit: limit || config.query.defualtLimit, 
        orderby: orderby || 'id', 
        direction: direction || 'ASC'
    };
};

export const getQueryMaxLimit = () => {
    return config.query.maxLimit;
};