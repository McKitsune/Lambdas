const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const userId = event.pathParameters ? event.pathParameters.id : null;

    if (userId) {
        const params = {
            TableName: 'Usuarios',
            Key: { id: userId },
        };

        try {
            const data = await dynamoDB.get(params).promise();
            if (data.Item) {
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        message: 'Usuario encontrado',
                        data: data.Item,
                    }),
                };
            } else {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: 'Usuario no encontrado' }),
                };
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: error.message }),
            };
        }
    }

    const params = {
        TableName: 'Usuarios',
    };

    try {
        const data = await dynamoDB.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Listado de usuarios', data: data.Items }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};
