import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

const ddb = new DynamoDBClient();

export const handler = async (event: any) => {
    // Get the id from path parameters
    const { id } = event.pathParameters;
    
    await ddb.send(
        new DeleteItemCommand({
            TableName: process.env.DYNAMODB_TABLE_NAME!,
            Key: marshall({ id })
        })
    )

    return {
        statusCode: 200,
        body: JSON.stringify({ success: id }),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}