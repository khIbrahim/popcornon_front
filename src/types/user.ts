export type USER_TYPES = "user" | "admin" | "cine";

export interface LoginUserI {
  email: string;
  password: string;
}

export interface RegisterUserI {
  email: string;
  password: string;
  confirmPassword: string;

  firstName: string;
  lastName: string;
  phone?: string;

  acceptTerms: boolean;
  rememberMe: boolean | undefined;
}

export interface BasicUserI {
  id:                 string;

  email:              string;
  first_name:         string;
  last_name:          string;

  phone?:             string;

  role:               USER_TYPES;
  email_verified_at:  boolean;

  is_active?:         boolean;

  full_name?:         string;
  is_locked?:         boolean;

  lastLoginAt?:       string | null;
  lastLoginIP?:       string | null;

  createdAt:          string;
  updatedAt:          string;
}

export interface UserI extends BasicUserI {
  passwordChangedAt?: string;
  data: any;
}