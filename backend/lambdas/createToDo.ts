import { DynamoDBClient, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuidv4 } from "uuid";

const ddb = new DynamoDBClient();

export const handler = async (event: any) => {
    // Parse the request body from API Gateway
    const body = JSON.parse(event.body || '{}');
    
    const item = {
        id: uuidv4(),
        text: body.text,
        completed: false
    }

    await ddb.send(
        new PutItemCommand({
            TableName: process.env.DYNAMODB_TABLE_NAME!,
            Item: marshall(item)
        })
    )

    return {
        statusCode: 200,
        body: JSON.stringify(item),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}