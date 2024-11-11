const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const userId = event.pathParameters.id;

    const params = {
        TableName: "Usuarios",
        Key: { id: userId },
    };

    try {
        await dynamoDB.delete(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Usuario eliminado" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error al eliminar usuario", error }),
        };
    }
};
