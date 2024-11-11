const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { id, status } = JSON.parse(event.body);

    const params = {
        TableName: "Pedidos",
        Key: { id },
        UpdateExpression: "set orderStatus = :status",
        ExpressionAttributeValues: { ":status": status },
        ReturnValues: "UPDATED_NEW",
    };

    try {
        const data = await dynamoDB.update(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Estado de pedido actualizado", data }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error al actualizar estado de pedido", error }),
        };
    }
};
