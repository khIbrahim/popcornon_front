import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import PasswordStrengthBar from "./PasswordStrengthBar.tsx";
import type { AuthMessage, PasswordStrength } from "../../lib/types.ts";
import { isValidEmail, getPasswordStrength } from "../../lib/validators.ts";
import {register} from "../../Api/endpoints/auth.ts";

interface Props {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    onRegisterSuccess: (msg: AuthMessage) => void;
    onRegisterFailure: (msg: AuthMessage) => void;
}

const RegisterForm: React.FC<Props> = ({
    isLoading,
    setIsLoading,
    onRegisterSuccess,
    onRegisterFailure,
}) => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [strength, setStrength] = useState<PasswordStrength>("weak");

    const handlePassword = (value: string) => {
        const level = getPasswordStrength(value);
        setStrength(level);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const form = formRef.current;
        if (! form) {
            return;
        }

        const data = new FormData(form);

        const email = String(data.get("email") || "");
        const password = String(data.get("password") || "");
        const confirmPassword = String(data.get("confirmPassword") || "");
        const firstName = String(data.get("firstName") || "");
        const lastName = String(data.get("lastName") || "");
        const phone = String(data.get("phone") || "");
        const rememberMe = Boolean(data.get("rememberMe"));
        const acceptTerms = Boolean(data.get("acceptTerms"));

        if (! email || ! password || ! confirmPassword || ! firstName || ! lastName || ! acceptTerms) {
            onRegisterFailure({ type: "error", text: "Tous les champs sont requis." });
            setIsLoading(false);
            return;
        }

        if (! isValidEmail(email)) {
            onRegisterFailure({ type: "error", text: "Email invalide." });
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            onRegisterFailure({
                type: "error",
                text: "Les mots de passe ne correspondent pas.",
            });
            setIsLoading(false);
            return;
        }

        if (phone && ! /^\+?[0-9]{7,15}$/.test(phone)) {
            onRegisterFailure({
                type: "error",
                text: "Numéro de téléphone invalide.",
            });
            setIsLoading(false);
            return;
        }

        try {
            const res = await register({ email, password, confirmPassword, firstName, lastName, phone, acceptTerms, rememberMe });

            if (res.success) {
                onRegisterSuccess({
                    type: "success",
                    text: "Inscription réussie !"
                });
            } else {
                const errorMsg =
                    res.errors?.[0]?.message ||
                    res.message ||
                    "Une erreur est survenue.";

                onRegisterFailure({
                    type: "error",
                    text: errorMsg
                });
            }
        } catch (error) {
            onRegisterFailure({
                type: "error",
                text: "Une erreur réseau est survenue. Veuillez réessayer."
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* First Name */}
            <div>
                <label className="text-sm text-gray-300 mb-1 block">Prénom</label>
                <input
                    name="firstName"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Jean"
                />
            </div>

            {/* Last Name */}
            <div>
                <label className="text-sm text-gray-300 mb-1 block">Nom</label>
                <input
                    name="lastName"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Dupont"
                />
            </div>

            {/* Phone */}
            <div>
                <label className="text-sm text-gray-300 mb-1 block">Téléphone</label>
                <input
                    name="phone"
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="+33 6 12 34 56 78"
                />
            </div>

            {/* Email */}
            <div>
                <label className="text-sm text-gray-300 mb-1 block">
                    Adresse email
                </label>
                <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="email@example.com"
                />
            </div>

            {/* Password */}
            <div>
                <label className="text-sm text-gray-300 mb-1 block">Mot de passe</label>
                <input
                    name="password"
                    type="password"
                    required
                    onInput={(e) => handlePassword((e.target as HTMLInputElement).value)}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="••••••••"
                />
                <PasswordStrengthBar strength={strength} />
            </div>

            {/* Confirm Password */}
            <div>
                <label className="text-sm text-gray-300 mb-1 block">
                    Confirmer le mot de passe
                </label>
                <input
                    name="confirmPassword"
                    type="password"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="••••••••"
                />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
                <input
                    type="checkbox"
                    required
                    className="mt-1 accent-red-600"
                    name="acceptTerms"
                />
                <p className="text-sm text-gray-300">
                    J'accepte les{" "}
                    <a className="text-red-400 hover:underline cursor-pointer">
                        conditions d'utilisation
                    </a>{" "}
                    et la{" "}
                    <a className="text-red-400 hover:underline cursor-pointer">
                        politique de confidentialité
                    </a>
                    .
                </p>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition"
            >
                {isLoading ? "Chargement..." : "Créer mon compte"}
            </button>
        </motion.form>
    );
};

export default RegisterForm;