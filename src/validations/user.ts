import { z, type MyZodType } from "../config/defaultZod.ts";
import { mongodbIdSchema } from "./elements.ts";
import type { BasicUserI, LoginUserI, RegisterUserI, UserI } from "../types/models/user.ts";

export const passwordSchema = z
    .string()
    .min(8, "Password must at least have 8 characters")
    .max(128, "Password must be at most 128 characters")
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/,
        "Password must contain uppercase, lowercase, number and special character"
    );

export const loginSchema = z.object({
  email: z.string().email("Email must be valid").trim().toLowerCase(),
  password: passwordSchema,
}) as z.ZodObject<MyZodType<LoginUserI>>;

export const registerUserSchema = z
    .object({
      email: z.string().email("Email must be valid").trim().toLowerCase(),

      password: passwordSchema,
      confirmPassword: z.string(),

      firstName: z
          .string()
          .min(2, "First name must have at least 2 letters")
          .max(50, "First name must have at most 50 letters")
          .trim()
          .transform((v) => v.charAt(0).toUpperCase() + v.slice(1)),

      lastName: z
          .string()
          .min(2, "Last name must have at least 2 letters")
          .max(50, "Last name must have at most 50 letters")
          .trim()
          .transform((v) => v.charAt(0).toUpperCase() + v.slice(1)),

      phone: z
          .string()
          .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
          .optional(),

      acceptTerms: z
          .boolean()
          .refine((val) => val === true, {
            message: "You must accept the terms and conditions",
          }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }) as z.ZodObject<MyZodType<RegisterUserI>>;

export const basicUserSchema = z.object({
  _id: mongodbIdSchema,

  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),

  phone: z.string().optional(),

  role: z.enum(["user", "admin", "cine"]),
  isEmailVerified: z.boolean(),

  isActive: z.boolean().optional(),

  lastLoginAt: z.string().nullable().optional(),
  lastLoginIP: z.string().nullable().optional(),

  createdAt: z.string(),
  updatedAt: z.string(),

  fullName: z.string().optional(),
  isLocked: z.boolean().optional(),
}) as z.ZodObject<MyZodType<BasicUserI>>;

export const userSchema = basicUserSchema.extend({
  passwordChangedAt: z.string().optional(),
}) as z.ZodObject<MyZodType<UserI>>;