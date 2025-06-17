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
          quality: true,
          downloadCount: true,
          uploadedAt: true,
          uploader: {
            select: {
              id: true,
              email: true,
              fullName: true,
            },
          },
          likes: true,
          comments: true,
        },
      });
    } catch (error) {
      throw new CustomError(error.message, error.statusCode);
    }
  }

  /**
   * Create a wallpaper
   * @route POST /api/v1/wallpapers/create
   * @returns {Object} 200 - A wallpaper
   */
  static async createWallpaper(data, userId) {
    try {
      return await prisma.wallpaper.create({
        data: {
          ...data,
          uploader: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } catch (error) {
      throw new CustomError(error.message, error.statusCode);
    }
  }

  /**
   * Like a wallpaper
   * @route POST /api/v1/wallpapers/like
   * @returns {Object} 200 - A wallpaper
   */
  static async likeWallpaper(id, userId) {
    try {
      const wallpaper = await prisma.wallpaper.findUnique({
        where: {
          id,
        },
      });
      if (!wallpaper) {
        throw new CustomError('Wallpaper not found', 404);
      }
      const like = await prisma.like.findUnique({
        where: {
          userId_wallpaperId: {
            userId,
            wallpaperId: id,
          },
        },
      });

      if (like) {
        throw new CustomError('You have already liked this wallpaper', 400);
      }

      await prisma.wallpaper.update({
        where: {
          id,
        },
        data: {
          likes: {
            create: {
              userId,
            },
          },
        },
      });

      return await prisma.like.findMany({
        where: {
          userId,
        },
        select: {
          wallpaperId: true,
        },
      });
    } catch (error) {
      throw new CustomError(error.message, error.statusCode);
    }
  }

  /**
   * Download a wallpaper
   * @route POST /api/v1/wallpapers/download
   * @returns {Object} 200 - A wallpaper
   */
  static async downloadWallpaper(id, userId) {
    try {
      const wallpaper = await prisma.wallpaper.findUnique({
        where: {
          id,
        },
      });
      if (!wallpaper) {
        throw new CustomError('Wallpaper not found', 404);
      }
      return await prisma.wallpaper.update({
        where: {
          id,
        },
        data: {
          downloadCount: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      throw new CustomError(error.message, error.statusCode);
    }
  }
}
