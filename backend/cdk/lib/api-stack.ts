import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { IFunction } from 'aws-cdk-lib/aws-lambda';

export interface ApiStackProps extends cdk.StackProps {
    createLambda: IFunction;
    updateLambda: IFunction;
    deleteLambda: IFunction;
    getLambda: IFunction;
}

export class ApiStack extends cdk.Stack {
    public readonly api: apigateway.RestApi;

    constructor(scope: Construct, id: string, props: ApiStackProps) {
        super(scope, id, props);

        this.api = new apigateway.RestApi(this, 'ToDoApi', {
            restApiName: 'ToDo API',
            description: 'This service handles ToDo items',
            defaultCorsPreflightOptions: {
                allowOrigins: ['*'],
                allowMethods: ['GET', 'POST', 'PUT', 'DELETE']
            }
        });

        const todos = this.api.root.addResource('todos');

        todos.addMethod('POST', new apigateway.LambdaIntegration(props.createLambda));
        todos.addMethod('GET', new apigateway.LambdaIntegration(props.getLambda));

        const todo = todos.addResource('{id}');
        todo.addMethod('PUT', new apigateway.LambdaIntegration(props.updateLambda));
        todo.addMethod('DELETE', new apigateway.LambdaIntegration(props.deleteLambda));

        new cdk.CfnOutput(this, 'ApiUrl', {
            value: this.api.url
        });
    }
}