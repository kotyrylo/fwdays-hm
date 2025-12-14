import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

const ddb = new DynamoDBClient();

export const handler = async (event: any) => {
    // Parse the request body and get path parameters from API Gateway
    const body = JSON.parse(event.body || '{}');
    const { id } = event.pathParameters;
    const { text, completed } = body;

    const result = await ddb.send(new UpdateItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME!,
        Key: marshall({ id }),

        UpdateExpression: "SET #text = :text, #completed = :completed",
        ExpressionAttributeNames: {
            "#text": "text",
            "#completed": "completed"
        },

        ExpressionAttributeValues: marshall({
            ":text": text,
            ":completed": completed
        }),

        ReturnValues: "ALL_NEW"
    }));

    return {
        statusCode: 200,
        body: JSON.stringify(result.Attributes),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    };
};
