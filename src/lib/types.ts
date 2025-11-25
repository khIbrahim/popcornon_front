export type AuthMessageType = "success" | "error";

export interface AuthMessage {
    type: AuthMessageType;
    text: string;
}

export type PasswordStrength = "weak" | "medium" | "strong";