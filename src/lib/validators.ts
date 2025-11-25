import type {PasswordStrength} from './types';

export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function getPasswordStrength(password: string): PasswordStrength {
    let score = 0;
    if (password.length >= 8) {
        score++;
    }
    if (/[a-z]/.test(password)) {
        score++;
    }
    if (/[A-Z]/.test(password)) {
        score++;
    }
    if (/[0-9]/.test(password)) {
        score++;
    }
    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    }

    if (score <= 2) return "weak";
    if (score === 3 || score === 4) return "medium";
    return "strong";
}