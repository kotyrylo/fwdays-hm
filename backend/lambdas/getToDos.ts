import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const ddb = new DynamoDBClient();

export const handler = async () => {
    const res = await ddb.send(
        new ScanCommand({
            TableName: process.env.DYNAMODB_TABLE_NAME!
        })
    )

    const items = (res.Items || []).map((i) => unmarshall(i))

    return {
        statusCode: 200,
        body: JSON.stringify(items),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}