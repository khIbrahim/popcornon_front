import axios from "axios";
import { userSchema } from "../../validations/user";
import axiosConfig from "../config";
import type { LoginUserI, RegisterUserI } from "../../types/user";

type AuthFailure = {
  success: false;
  message: string;
  errors: Record<string, string[]> | null;
};

function handleAuthError(error: unknown): AuthFailure {
  if (axios.isAxiosError(error)) {
    return {
      success: false,
      message:
          error.response?.data?.message ??
          "Une erreur serveur est survenue.",
      errors: error.response?.data?.errors ?? null,
    };
  }

  return {
    success: false,
    message: "Une erreur réseau est survenue. Veuillez réessayer.",
    errors: null,
  };
}

function saveToken(token: string, rememberMe = false) {
  sessionStorage.removeItem("token");
  localStorage.removeItem("token");

  if (rememberMe) {
    localStorage.setItem("token", token);
  } else {
    sessionStorage.setItem("token", token);
  }
}

function getToken() {
  return sessionStorage.getItem("token") ?? localStorage.getItem("token");
}

export async function login({
                              email,
                              password,
                              rememberMe,
                            }: LoginUserI & { rememberMe?: boolean }) {
  try {
    const response = await axiosConfig.post("/login", {
      email,
      password,
    });

    const data = response.data;

    if (data.success && data.token) {
      saveToken(data.token, rememberMe);
    }

    return data;
  } catch (error: unknown) {
    return handleAuthError(error);
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
  try {
    const response = await axiosConfig.post("/register", {
      email,
      password,
      password_confirmation: confirmPassword,
      firstName,
      lastName,
      phone,
      acceptTerms,
    });

    const data = response.data;

    if (data.success && data.token) {
      saveToken(data.token, rememberMe);
    }

    return data;
  } catch (error: unknown) {
    return handleAuthError(error);
  }
}

export async function logout() {
  try {
    await axiosConfig.post("/logout");

    sessionStorage.removeItem("token");
    localStorage.removeItem("token");

    return {
      success: true,
      message: "Déconnexion réussie",
    };
  } catch (error: unknown) {
    return handleAuthError(error);
  }
}

export async function checkAuth() {
  const token = getToken();

  if (! token) {
    return {
      success: false,
      message: "Non authentifié",
      errors: null,
    };
  }

  try {
    const response = await axiosConfig.get("/user");

    const user = userSchema.parse(response.data.data);

    return {
      success: true,
      message: "Authentifié",
      data: user,
    };
  } catch (error) {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");

    return {
      success: false,
      message: "Non authentifié",
      errors: null,
    };
  }
}