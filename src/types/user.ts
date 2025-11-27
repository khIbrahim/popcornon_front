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
  _id: string;

  email: string;
  firstName: string;
  lastName: string;

  phone?: string;

  role: USER_TYPES;
  isEmailVerified: boolean;

  isActive?: boolean;

  fullName?: string;
  isLocked?: boolean;

  lastLoginAt?: string | null;
  lastLoginIP?: string | null;

  cinemaId?: string;

  createdAt: string;
  updatedAt: string;
}

export interface UserI extends BasicUserI {
  passwordChangedAt?: string;
  data: any;
}