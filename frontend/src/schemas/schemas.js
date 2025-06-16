import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
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

