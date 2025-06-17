import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password must be at least 1 character long"),
});

export const permissionAssignmentSchema = z.object({
  userId: z.coerce.number().int().positive("Invalid user ID"),
  permissions: z
    .array(
      z.coerce.number().int().positive({ message: "Invalid permission ID" })
    )
    .min(1, "At least one permission is required"),
});

export const registerFormSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const uploadWallpaperSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),

  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),

  category: z.string().min(1, "Please select a category"),

  quality: z.string().min(1, "Please select quality"),

  image: z
    .any()
    .refine((file) => file !== null && file !== undefined, "Image is required")
    .refine((file) => {
      if (!file) return false;
      return file?.size <= MAX_FILE_SIZE;
    }, "Max file size is 10MB")
    .refine((file) => {
      if (!file) return false;
      return ACCEPTED_IMAGE_TYPES.includes(file?.type);
    }, "Only .jpg, .jpeg, .png and .webp formats are supported"),
});
