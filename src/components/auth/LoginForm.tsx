import type { AuthMessage } from "../../lib/types.ts";
import React, { useRef } from "react";
import { isValidEmail } from "../../lib/validators.ts";
import { login } from "../../Api/endpoints/auth.ts";

interface LoginFormProps {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    onLoginSuccess: (msg: AuthMessage) => void;
    onLoginFailure: (msg: AuthMessage) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
    isLoading,
    setIsLoading,
    onLoginSuccess,
    onLoginFailure
}) => {
    const formRef = useRef<HTMLFormElement | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);

        const form = formRef.current;
        if (! form) {
            setIsLoading(false);
            return;
        }

        const data = new FormData(form);
        const email = String(data.get("email") || "");
        const password = String(data.get("password") || "");
        const rememberMe = Boolean(data.get("rememberMe"));

        if (! email || ! password) {
            onLoginFailure({ type: "error", text: "Email et mot de passe requis." });
            setIsLoading(false);
            return;
        }

        if (! isValidEmail(email)) {
            onLoginFailure({ type: "error", text: "Format email invalide." });
            setIsLoading(false);
            return;
        }

        try {
            const res = await login({ email, password, rememberMe });

            if (res.success) {
                onLoginSuccess({
                    type: "success",
                    text: "Connexion réussie !"
                });
            } else {
                onLoginFailure({
                    type: "error",
                    text: res.message || "Échec de la connexion."
                });
            }
        } catch (error) {
            onLoginFailure({
                type: "error",
                text: "Une erreur réseau est survenue. Veuillez réessayer."
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <div>
                <label className="text-sm text-gray-300 mb-2 block">
                    Adresse email
                </label>
                <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="email@example.com"
                />
            </div>

            <div>
                <label className="text-sm text-gray-300 mb-2 block">
                    Mot de passe
                </label>
                <input
                    type="password"
                    name="password"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="••••••••"
                />
            </div>

            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-gray-300 text-sm">
                    <input
                        type="checkbox"
                        className="accent-red-600"
                        name="rememberMe"
                        id="rememberMe"
                    /> Se souvenir
                </label>

                <a className="text-red-400 text-sm hover:underline cursor-pointer">
                    Mot de passe oublié ?
                </a>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition flex justify-center cursor-pointer"
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    "Se connecter"
                )}
            </button>
        </form>
    );
};

export default LoginForm;