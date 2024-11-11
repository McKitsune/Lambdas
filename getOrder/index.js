const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const orderId = event.pathParameters.id;

    const params = {
        TableName: "Pedidos",
        Key: { id: orderId },
    };

    try {
        const data = await dynamoDB.get(params).promise();
        return data.Item
            ? { statusCode: 200, body: JSON.stringify({ message: "Pedido encontrado", data: data.Item }) }
            : { statusCode: 404, body: JSON.stringify({ message: "Pedido no encontrado" }) };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error al obtener pedido", error }),
        };
    }
};
