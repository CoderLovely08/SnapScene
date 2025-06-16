import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './users.routes.js';
import wallpaperRoutes from './wallpapers.routes.js';
import { validateToken } from '@/middlewares/auth.middleware.js';
const router = Router();

// Auth Routes
router.use('/auth', authRoutes);

// User Routes
router.use('/users', validateToken, userRoutes);

// Wallpaper Routes
router.use('/wallpapers', validateToken, wallpaperRoutes);

export default router;
