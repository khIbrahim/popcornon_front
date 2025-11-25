import { z } from "../config/defaultZod.ts";

export const passwordSchema = z
  .string()
  .min(8, { error: "Password must be at least 8 characters long" })
  .refine((val) => /[A-Z]/.test(val), {
    error: "Password must contain at least one uppercase letter",
  })
  .refine((val) => /[a-z]/.test(val), {
    error: "Password must contain at least one lowercase letter",
  })
  .refine((val) => /[0-9]/.test(val), {
    error: "Password must contain at least one digit",
  });
export const mongodbIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, { error: "Invalid MongoDB ID format" });