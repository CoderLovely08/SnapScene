import { APIResponse } from '@/service/core/CustomResponse.js';
import { WallpaperService } from '@/service/v1/Wallpaper.service.js';

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
}
