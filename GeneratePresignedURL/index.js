const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({ region: "us-east-1" });
const S3_BUCKET = "knexusimg";

exports.handler = async (event) => {
    const fileName = event.queryStringParameters.fileName;
    const params = {
        Bucket: S3_BUCKET,
        Key: `${Date.now()}_${fileName}`,
        Expires: 60 // URL válida por 60 segundos
    };

    try {
        const command = new PutObjectCommand(params);
        const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
        return {
            statusCode: 200,
            body: JSON.stringify({ url }),
        };
    } catch (error) {
        console.error("Error al generar la URL pre-firmada:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error al generar la URL pre-firmada" }),
        };
    }
};
