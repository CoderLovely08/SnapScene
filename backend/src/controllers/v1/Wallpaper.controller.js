import { APIResponse } from '@/service/core/CustomResponse.js';
import { WallpaperService } from '@/service/v1/Wallpaper.service.js';
import { FILE_KEYS } from '@/utils/constants/app.constant.js';

export class WallpaperController {
  /**
   * Get all wallpapers
   * @route GET /api/v1/wallpapers/get-all
   * @returns {Object} 200 - A list of wallpapers
   */
  static async getAllWallpapers(req, res, next) {
    try {
      const wallpapers = await WallpaperService.getAllWallpapers();
      await new Promise((resolve) => setTimeout(resolve, 500));
      return APIResponse.success(res, wallpapers, 'Wallpapers fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create a wallpaper
   * @route POST /api/v1/wallpapers/create
   * @returns {Object} 200 - A wallpaper
   */
  static async createWallpaper(req, res, next) {
    try {
      const user = req.user;

      const { title, description, category, quality } = req.body;
      const { url } = req.files[FILE_KEYS.WALLPAPER];
      const wallpaper = await WallpaperService.createWallpaper(
        {
          title,
          description,
          category,
          quality,
          imageUrl: url,
        },
        user.userId,
      );
      return APIResponse.success(res, wallpaper, 'Wallpaper created successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Like a wallpaper
   * @route POST /api/v1/wallpapers/like
   * @returns {Object} 200 - A wallpaper
   */
  static async likeWallpaper(req, res, next) {
    try {
      const user = req.user;
      const { id } = req.body;
      const wallpaper = await WallpaperService.likeWallpaper(id, user.userId);
      return APIResponse.success(res, wallpaper, 'Wallpaper liked successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Download a wallpaper
   * @route POST /api/v1/wallpapers/download
   * @returns {Object} 200 - A wallpaper
   */
  static async downloadWallpaper(req, res, next) {
    try {
      const user = req.user;
      const { id } = req.body;
      const wallpaper = await WallpaperService.downloadWallpaper(id, user.userId);

      return APIResponse.success(res, wallpaper, 'Wallpaper downloaded successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create a comment on a wallpaper
   * @route POST /api/v1/wallpapers/comment
   * @returns {Object} 200 - A comment
   */
  static async createComment(req, res, next) {
    try {
      const user = req.user;
      const { wallpaperId, content } = req.body;
      const comment = await WallpaperService.createComment(wallpaperId, user.userId, content);
      return APIResponse.success(res, comment, 'Comment created successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get comments for a wallpaper
   * @route POST /api/v1/wallpapers/comments
   * @returns {Object} 200 - List of comments
   */
  static async getComments(req, res, next) {
    try {
      const { wallpaperId } = req.body;
      const comments = await WallpaperService.getComments(wallpaperId);
      return APIResponse.success(res, comments, 'Comments fetched successfully');
    } catch (error) {
      next(error);
    }
  }
}
