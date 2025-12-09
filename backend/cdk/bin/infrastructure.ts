#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { DynamoDBStack } from '../lib/dynamodb-stack';
import { ApiStack } from '../lib/api-stack';
import { LambdaStack } from '../lib/lambda-stack';
import { FrontendStack } from '../lib/frontend-stack';

const app = new cdk.App();
const db = new DynamoDBStack(app, 'DynamoDBStack');


const lambda = new LambdaStack(app, 'LambdaStack', {
  toDoTable: db.table
});

const frontend = new FrontendStack(app, 'FrontendStack');

const api = new ApiStack(app, 'ApiStack', {
    createLambda: lambda.createLambda,
    updateLambda: lambda.updateLambda,
    deleteLambda: lambda.deleteLambda,
    getLambda: lambda.getLambda
});
