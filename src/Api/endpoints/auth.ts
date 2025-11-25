import { userSchema } from "../../validations/user";
import axiosConfig from "../config";
import type { LoginUserI, RegisterUserI, UserI } from "../../types/models/user";
import type { ResponseI } from "../../types/response";

const getToken = () => sessionStorage.getItem("token") ?? localStorage.getItem("token");

export async function login({
  email,
  password,
  rememberMe
}: LoginUserI & { rememberMe?: boolean }) {
  sessionStorage.removeItem("token");
  localStorage.removeItem("token");

  try {
    const response = await axiosConfig.post<ResponseI<UserI>>("/auth/login", {
      email,
      password
    });

    const data = response.data;

    if (data.success && data.data) {
      const validatedUser = userSchema.parse(data.data);

      if (data.token) {
        if (rememberMe) {
          localStorage.setItem("token", data.token);
        }
        sessionStorage.setItem("token", data.token);
      }

      return { ...data, data: validatedUser };
    }

    return data;

  } catch (error: any) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Unknown server error",
        errors: error.response.data?.errors || null,
      };
    }

    return {
      success: false,
      message: "Une erreur réseau est survenue. Veuillez réessayer.",
      errors: null,
    };
  }
}

export async function register({
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
  phone,
  acceptTerms,
  rememberMe,
}: RegisterUserI) {

  sessionStorage.removeItem("token");
  localStorage.removeItem("token");

  try {
    const response = await axiosConfig.post<ResponseI<UserI>>("/auth/register", {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      phone,
      acceptTerms,
    });

    const data = response.data;

    if (data.success && data.data) {
      const validatedUser = userSchema.parse(data.data);

      if (data.token) {
        if (rememberMe) {
          localStorage.setItem("token", data.token);
        }

        sessionStorage.setItem("token", data.token);
      }

      return { ...data, data: validatedUser };
    }

    return data;
  } catch (error: any) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Unknown server error",
        errors: error.response.data?.errors || null,
      };
    }

    return {
      success: false,
      message: "Une erreur réseau est survenue. Veuillez réessayer.",
      errors: null,
    };
  }
}

export function logout() {
  sessionStorage.removeItem("token");
  localStorage.removeItem("token");
  return { success: true, message: "Logged out successfully" };
}

export async function checkAuth() {
  const token = getToken();

  if (! token) {
    return {
      success: false,
      message: "Non authentifié"
    };
  }

  try {
    const response = await axiosConfig.get<ResponseI<UserI>>("/auth/me");
    const data = response.data;

    if (data.success && data.data) {
      const validatedUser = userSchema.parse(data.data);
      return {
        ...data,
        data: validatedUser
      };
    }

    logout();
    return {
      success: false,
      message: "Invalid token"
    };

  } catch (err) {
    logout();
    return {
      success: false,
      message: "Not authenticated"
    };
  }
}
