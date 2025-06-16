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

      res.download(wallpaper.imageUrl);
      return APIResponse.success(res, wallpaper, 'Wallpaper downloaded successfully');
    } catch (error) {
      next(error);
    }
  }
}
