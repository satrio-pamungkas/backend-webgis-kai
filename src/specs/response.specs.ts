const response400 = {
    errors: [
        {
            status: 400,
            title: 'Bad Request',
            message: 'Default'
        }
    ]
};

const response401 = {
    errors: [
        {
            status: 401,
            title: 'Unauthorized',
            message: 'Default'
        }
    ]
}

const response403 = {
    errors: [
        {
            status: 403,
            title: 'Forbidden',
            message: 'Default'
        }
    ]
}

const response404 = {
    errors: [
        {
            status: 404,
            title: 'Not Found',
            message: 'Default'
        }
    ]
}

const response500 = {
    errors: [
        {
            status: 500,
            title: 'Internal Server Error',
            message: 'Default'
        }
    ]
};

export { response400, response401, response403, response404, response500 };