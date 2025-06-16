import { Router } from 'express';
import { WallpaperController } from '@/controllers/v1/Wallpaper.controller.js';

const router = Router();

/**
 * Get all wallpapers
 * @route GET /api/v1/wallpapers/get-all
 * @returns {Object} 200 - A list of wallpapers
 */
router.get('/get-all', WallpaperController.getAllWallpapers);

export default router;
