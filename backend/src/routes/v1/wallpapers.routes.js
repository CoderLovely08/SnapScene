import { Router } from 'express';
import { WallpaperController } from '@/controllers/v1/Wallpaper.controller.js';
import upload from '@/config/multer.config.js';
import { AWS_S3_FOLDERS, FILE_KEYS } from '@/utils/constants/app.constant.js';
import { higherOrderUserDataValidation } from '@/middlewares/validation.middleware.js';
import { ValidationSchema } from '@/schema/validation.schema.js';
import { CommonController } from '@/controllers/core/Common.controller.js';
import { validateToken } from '@/middlewares/auth.middleware.js';

const router = Router();

/**
 * Get all wallpapers
 * @route GET /api/v1/wallpapers/get-all
 * @returns {Object} 200 - A list of wallpapers
 */
router.get('/get-all', WallpaperController.getAllWallpapers);

/**
 * Create a wallpaper
 * @route POST /api/v1/wallpapers/create
 * @returns {Object} 200 - A wallpaper
 */
router.post(
  '/create',
  validateToken,
  upload.single(FILE_KEYS.WALLPAPER),
  higherOrderUserDataValidation(ValidationSchema.wallpaperSchema),
  CommonController.handleUploadFile({
    fieldName: FILE_KEYS.WALLPAPER,
    fileOptions: {
      folderName: AWS_S3_FOLDERS.WALLPAPER_IMAGES,
    },
  }),
  WallpaperController.createWallpaper,
);

/**
 * Like a wallpaper
 * @route POST /api/v1/wallpapers/like
 * @returns {Object} 200 - A wallpaper
 */
router.post(
  '/like',
  validateToken,
  higherOrderUserDataValidation(ValidationSchema.idStringSchema),
  WallpaperController.likeWallpaper,
);

/**
 * Download a wallpaper
 * @route POST /api/v1/wallpapers/download
 * @returns {Object} 200 - A wallpaper
 */
router.post(
  '/download',
  validateToken,
  higherOrderUserDataValidation(ValidationSchema.idStringSchema),
  WallpaperController.downloadWallpaper,
);

/**
 * Create a comment on a wallpaper
 * @route POST /api/v1/wallpapers/comment
 * @returns {Object} 200 - A comment
 */
router.post(
  '/comment',
  validateToken,
  higherOrderUserDataValidation(ValidationSchema.createCommentSchema),
  WallpaperController.createComment,
);

/**
 * Get comments for a wallpaper
 * @route POST /api/v1/wallpapers/comments
 * @returns {Object} 200 - List of comments
 */
router.post(
  '/comments',
  higherOrderUserDataValidation(ValidationSchema.getCommentsSchema),
  WallpaperController.getComments,
);

export default router;
