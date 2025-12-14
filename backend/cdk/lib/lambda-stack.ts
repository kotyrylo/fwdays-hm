import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import path from 'path';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Table } from 'aws-cdk-lib/aws-dynamodb';

export interface LambdaStackProps extends cdk.StackProps {
    toDoTable: Table;
}

export class LambdaStack extends cdk.Stack {
    public readonly createLambda: NodejsFunction;
    public readonly updateLambda: NodejsFunction;
    public readonly deleteLambda: NodejsFunction;
    public readonly getLambda: NodejsFunction;
    
    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props);

        this.createLambda = new NodejsFunction(this, 'CreateToDo', {
            entry: path.join(__dirname, '../../lambdas/createToDo.ts'),
            runtime: lambda.Runtime.NODEJS_20_X,
            timeout: cdk.Duration.seconds(10),
            handler: 'handler',
            environment: {
                DYNAMODB_TABLE_NAME: props.toDoTable.tableName
            }
        });

        this.updateLambda = new NodejsFunction(this, 'UpdateToDo', {
            entry: path.join(__dirname, '../../lambdas/updateToDo.ts'),
            runtime: lambda.Runtime.NODEJS_20_X,
            timeout: cdk.Duration.seconds(10),
            handler: 'handler',
            environment: {
                DYNAMODB_TABLE_NAME: props.toDoTable.tableName
            }
        });

        this.deleteLambda = new NodejsFunction(this, 'DeleteToDo', {
            entry: path.join(__dirname, '../../lambdas/deleteToDo.ts'),
            runtime: lambda.Runtime.NODEJS_20_X,
            timeout: cdk.Duration.seconds(10),
            handler: 'handler',
            environment: {
                DYNAMODB_TABLE_NAME: props.toDoTable.tableName
            }
        });

        this.getLambda = new NodejsFunction(this, 'GetToDo', {
            entry: path.join(__dirname, '../../lambdas/getToDos.ts'),
            runtime: lambda.Runtime.NODEJS_20_X,
            timeout: cdk.Duration.seconds(10),
            handler: 'handler',
            environment: {
                DYNAMODB_TABLE_NAME: props.toDoTable.tableName
            }
        });


        props.toDoTable.grantFullAccess(this.createLambda);
        props.toDoTable.grantFullAccess(this.updateLambda);
        props.toDoTable.grantFullAccess(this.deleteLambda);
        props.toDoTable.grantFullAccess(this.getLambda);
    }
} 