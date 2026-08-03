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
}

export interface BasicUserI {
  id:                 number;

  email:              string;
  first_name:         string;
  last_name:          string;
  name:               string;

  phone?:             string;

  role:               "client" | "admin" | "cine";

  is_active:          boolean;

  is_locked?:         boolean;

  created_at:          string;
  updated_at:          string;
}

export interface UserI extends BasicUserI {
  passwordChangedAt?: string;
}
