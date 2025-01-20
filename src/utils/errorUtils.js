export const formErrorResponse = (message, details = []) => {
    return {
        error : {
            message : message,
            details : Array.isArray(details) ? details : [details],
        }
    };
}