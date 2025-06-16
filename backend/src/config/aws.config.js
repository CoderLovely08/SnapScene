import { S3Client } from '@aws-sdk/client-s3';
import config from './app.config.js';
export const s3Client = new S3Client({
  region: config.AWS.S3.REGION,
  credentials: {
    accessKeyId: config.AWS.S3.ACCESS_KEY,
    secretAccessKey: config.AWS.S3.SECRET_KEY,
  },
});
