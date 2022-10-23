const successResponse = (res, data, status) => {
    res.status(status || 200).json(data);
    return null;
};

const badRequest = (res, data, status) => {
    res.status(status || 400).json(data);
    return null;
};

const internalServer = (res, data, status) => {
    res.status(status || 500).json(data);
    return null;
};

module.exports = {
    successResponse,
    badRequest,
    internalServer
};