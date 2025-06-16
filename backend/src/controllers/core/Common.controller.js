import { S3Service } from '@/service/core/S3.service.js';
import fs from 'fs';
import { AWS_S3_FOLDERS } from '@/utils/constants/app.constant.js';
import { CustomError } from '@/service/core/CustomResponse.js';

const defaultFileOptions = {
  folderName: AWS_S3_FOLDERS.WALLPAPER_IMAGES,
};

export class CommonController {
  /**
   * @description Upload a file (single/multiple) to Supabase Storage
   * @param {string} fieldName - The name of the field to upload
   * @returns {Function} Middleware function
   */
  static handleUploadFile({ fieldName, fileOptions = defaultFileOptions }) {
    return async (req, res, next) => {
      try {
        fileOptions = { ...defaultFileOptions, ...fileOptions };

        if (!req.files) req.files = {};

        let uploadedFile = req.file;

        // Handle absence
        if (!uploadedFile) {
          throw new CustomError(`${fieldName} file is required`, 400);
        }

        const originalFileName = uploadedFile.originalname;
        const fileBuffer = uploadedFile.buffer || fs.readFileSync(uploadedFile.path);
        const fileType = uploadedFile.mimetype;

        const supportedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!supportedTypes.includes(fileType)) {
          throw new CustomError('Unsupported file type', 415);
        }

        if (uploadedFile.size > 10 * 1024 * 1024) {
          throw new CustomError('File size exceeds limit', 415);
        }

        let finalBuffer = fileBuffer;

        const fileUrl = await S3Service.uploadFileToS3(
          originalFileName,
          finalBuffer,
          fileType,
          fileOptions.folderName,
        );

        req.files[fieldName] = {
          url: fileUrl?.fileUrl,
          originalName: originalFileName,
          type: fileType,
        };

        next();
      } catch (error) {
        console.error('Error uploading file', error);
        return next(error);
      } finally {
        try {
          // Remove temp files
          const filesToClean = Array.isArray(req.files[fieldName])
            ? req.files[fieldName]
            : [req.files[fieldName]];

          for (const file of filesToClean || []) {
            if (file?.path && fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
          }

          if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
          }
        } catch (cleanupError) {
          console.warn('File cleanup error:', cleanupError.message);
        }
      }
    };
  }
}
