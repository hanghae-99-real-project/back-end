const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const options = {
    info: {
        title: 'PooDenag API 테스트',
        description: '푸댕 API테스트입니다.',
    },
    host: '13.125.250.60',
    schemes: ['http'],
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            in: 'header',
            bearerFormat: 'JWT',
        },
    },
};
const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];
swaggerAutogen(outputFile, endpointsFiles, options);