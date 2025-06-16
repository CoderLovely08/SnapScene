import { prisma } from '@/config/app.config.js';
import { CustomError } from '@/service/core/CustomResponse.js';

export class WallpaperService {
  /**
   * Get all wallpapers
   * @returns {Object} 200 - A list of wallpapers
   */
  static async getAllWallpapers() {
    try {
      return await prisma.wallpaper.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          imageUrl: true,
          category: true,
          downloadCount: true,
          uploadedAt: true,
          uploader: true,
          likes: true,
          comments: true,
        },
      });
    } catch (error) {
      throw new CustomError(error.message, error.statusCode);
    }
  }
}
