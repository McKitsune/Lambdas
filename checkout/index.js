// checkout.js
const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { userId, cartItems } = JSON.parse(event.body);

    // Lógica para procesar los artículos en el carrito y crear un pedido
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const params = {
        TableName: "Orders",
        Item: {
            orderId: `order_${Date.now()}`,
            userId,
            products: cartItems,
            totalAmount,
            createdAt: new Date().toISOString(),
            status: "completed",
        },
    };

    try {
        await dynamoDB.put(params).promise();
        return {
            statusCode: 201,
            body: JSON.stringify({ message: "Pedido creado con éxito", data: params.Item }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error en el proceso de pago", error: error.message }),
        };
    }
};
