// getProduct.js
const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const productId = event.pathParameters ? event.pathParameters.id : null;

    if (productId) {
        const params = {
            TableName: "Productos",
            Key: { id: productId },
        };

        try {
            const data = await dynamoDB.get(params).promise();
            if (data.Item) {
                return {
                    statusCode: 200,
                    body: JSON.stringify({ message: "Producto encontrado", data: data.Item }),
                };
            } else {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: "Producto no encontrado" }),
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
        TableName: "Productos",
    };

    try {
        const data = await dynamoDB.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Listado de productos", data: data.Items }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};
