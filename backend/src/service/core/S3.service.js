import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '@/config/aws.config.js';
import { CustomError } from './CustomResponse.js';
import { AWS_S3_FOLDERS } from '@/utils/constants/app.constant.js';
import config from '@/config/app.config.js';

export class S3Service {
  /**
   * Uploads a file to AWS S3
   *
   * @param {string} originalFileName - The original name of the file
   * @param {Buffer} fileBuffer - The file buffer to upload
   * @param {string} fileType - The type of the file
   * @param {string} folderName - The folder name to upload the file to
   * @returns {Promise<Object>} - A result object indicating success or failure
   */
  static async uploadFileToS3(
    originalFileName,
    fileBuffer,
    fileType,
    folderName = AWS_S3_FOLDERS.PRODUCT_IMAGES,
  ) {
    try {
      const randomFileName = `${Date.now()}_${originalFileName
        .replaceAll(' ', '_')
        .replaceAll(/[^a-zA-Z0-9_.]/g, '')}`;

      const params = {
        Bucket: config.AWS.S3.BUCKET_NAME,
        Key: `${folderName}/${randomFileName}`,
        Body: fileBuffer,
        ContentType: fileType,
      };

      const putCommand = new PutObjectCommand(params);

      await s3Client.send(putCommand);

      const fileUrl = `https://${config.AWS.S3.BUCKET_NAME}.s3.${config.AWS.S3.REGION}.amazonaws.com/${folderName}/${randomFileName}`;

      return {
        fileSrc: `${folderName}/${randomFileName}`,
        fileUrl,
      };
    } catch (error) {
      console.error(`Error in uploadFileToS3: ${error.message}`);
      throw new CustomError(error.message, error.statusCode);
    }
  }

  /**
   * Deletes a file from AWS S3
   *
   * @param {string} fileUrl - The URL of the file to delete
   * @returns {Promise<Object>} - A result object indicating success or failure
   */
  static async deleteFileFromS3(fileUrl) {
    try {
      const fileName = fileUrl.split('/').slice(-1)[0];
      const folderName = fileUrl.split('/').slice(-2)[0];

      const params = {
        Bucket: config.AWS.S3.BUCKET_NAME,
        Key: `${folderName}/${fileName}`,
      };

      const deleteCommand = new DeleteObjectCommand(params);

      await s3Client.send(deleteCommand);

      return true;
    } catch (error) {
      console.error(`Error in deleteFileFromS3: ${error.message}`);
      throw new CustomError(error.message, error.statusCode);
    }
  }
}
