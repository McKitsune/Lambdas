const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { id, name, email } = JSON.parse(event.body);

    const params = {
        TableName: "Usuarios",
        Key: { id },
        UpdateExpression: "set #name = :name, email = :email",
        ExpressionAttributeNames: {
            "#name": "name",
        },
        ExpressionAttributeValues: {
            ":name": name,
            ":email": email,
        },
        ReturnValues: "UPDATED_NEW",
    };

    try {
        const data = await dynamoDB.update(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Usuario actualizado", data }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error al actualizar usuario", error }),
        };
    }
};
