const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { searchTerm } = JSON.parse(event.body);

    const params = {
        TableName: "Productos",
        FilterExpression: "contains(#name, :term)",
        ExpressionAttributeNames: { "#name": "name" },
        ExpressionAttributeValues: { ":term": searchTerm },
    };

    try {
        const data = await dynamoDB.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Productos encontrados", data: data.Items }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error en la búsqueda", error }),
        };
    }
};
