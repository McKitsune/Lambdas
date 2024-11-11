// Handler para createProduct
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    // Parseamos los datos del producto desde el body de la solicitud
    const { id, name, description, price, image } = JSON.parse(event.body);

    const params = {
        TableName: 'Products',
        Item: {
            id,
            name,
            description,
            price: parseFloat(price), // Asegura que el precio sea un número
            image,
        },
    };

    try {
        // Guardamos el producto en DynamoDB
        await dynamoDB.put(params).promise();
        return {
            statusCode: 201,
            body: JSON.stringify(params.Item),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al agregar producto', error }),
        };
    }
};
