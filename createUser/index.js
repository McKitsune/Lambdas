// createUser.js
const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { id, name, email } = JSON.parse(event.body);

    const params = {
        TableName: "Usuarios",
        Item: {
            id,
            name,
            email,
        },
    };

    try {
        await dynamoDB.put(params).promise();
        return {
            statusCode: 201,
            body: JSON.stringify({ message: "Usuario creado con éxito", data: params.Item }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error al crear el usuario", error: error.message }),
        };
    }
};
