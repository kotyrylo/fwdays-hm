import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { BucketDeployment, Source} from 'aws-cdk-lib/aws-s3-deployment';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const websiteBucket = new s3.Bucket(this, 'KyrylosFWDaysHM3');

    new cloudfront.Distribution(this, 'KyrylosFWDaysHM3Distribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html'
    })

    new BucketDeployment(this, 'KyrylosFWDaysHM3Deployment', {
      sources: [Source.asset('../frontend/dist')],
      destinationBucket: websiteBucket,
    });
  }
}
