const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { id, name, price, stock } = JSON.parse(event.body);

    const params = {
        TableName: "Productos",
        Key: { id },
        UpdateExpression: "set #name = :name, price = :price, stock = :stock",
        ExpressionAttributeNames: {
            "#name": "name",
        },
        ExpressionAttributeValues: {
            ":name": name,
            ":price": price,
            ":stock": stock,
        },
        ReturnValues: "UPDATED_NEW",
    };

    try {
        const data = await dynamoDB.update(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Producto actualizado", data }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error al actualizar producto", error }),
        };
    }
};
