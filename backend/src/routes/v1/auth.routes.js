import Router from 'express';
import { ValidationSchema } from '@/schema/validation.schema.js';
import { higherOrderUserDataValidation } from '@/middlewares/validation.middleware.js';
import { AuthController } from '@/controllers/v1/Auth.controller.js';

const router = Router();

/**
 * Handle post system user login
 * Route: /api/v1/auth/system/login
 * body: {
 *  email: string,
 *  password: string
 * }
 */
router.post(
  '/system/login',
  higherOrderUserDataValidation(ValidationSchema.loginSchema),
  AuthController.handlePostSystemUserLogin,
);

/**
 * Handle post system user registration
 * Route: /api/v1/auth/system/register
 * body: {
 *  email: string,
 *  password: string,
 *  fullName: string
 * }
 */
router.post(
  '/system/register',
  higherOrderUserDataValidation(ValidationSchema.simpleUserOnboardingSchema),
  AuthController.handlePostSystemUserRegistration,
);

/**
 * Handle post system user logout
 * Route: /api/v1/auth/system/logout
 */
router.post('/system/logout', AuthController.handlePostLogout);

export default router;
