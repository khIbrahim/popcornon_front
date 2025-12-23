import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Loader2, AlertCircle } from "lucide-react";
import { ShaderOrbs } from "../../components/auth/ShaderOrbs.tsx";
import { AnimatedBackground } from "../../components/auth/AnimatedBackground.tsx";
import { Button } from "../../components/ui/button.tsx";
import { Input } from "../../components/ui/input.tsx";
import { Label } from "../../components/ui/label.tsx";
import { Checkbox } from "../../components/ui/checkbox.tsx";
import { Link, useNavigate } from "react-router-dom";
import { isValidEmail } from "../../lib/validators.ts";
import { login } from "../../Api/endpoints/auth.ts";
import { useAuth } from "../../hooks/useAuth";
import { useNotification } from "../../context/NotificationContext.tsx";

export default function LoginPage() {
    const navigate = useNavigate();
    const { refresh } = useAuth();
    const { notifySuccess, notifyError } = useNotification();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (!email || !password) {
            const msg = "Veuillez remplir tous les champs.";
            setError(msg);
            notifyError("Erreur de formulaire", msg);
            setIsLoading(false);
            return;
        }

        if (!isValidEmail(email)) {
            const msg = "L'adresse email n'est pas valide.";
            setError(msg);
            setIsLoading(false);
            return;
        }

        try {
            const res = await login({ email, password, rememberMe });

            if (res.success) {
                notifySuccess("Connexion réussie !", "Ravi de vous revoir.");
                await refresh();
                navigate("/");
            } else {
                const msg = res.message || "Email ou mot de passe incorrect.";
                setError(msg);
                notifyError("Échec de connexion", msg);
            }
        } catch {
            const msg =
                "Une erreur inattendue est survenue. Vérifiez votre connexion.";
            setError(msg);
            notifyError("Erreur système", "Impossible de contacter le serveur.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-black">
            <ShaderOrbs />
            <AnimatedBackground />

            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-4xl z-10"
            >
                <div className="flex flex-col items-center mb-8 text-center">
                    <h1 className="text-4xl font-black text-white tracking-tight">
                        Bon retour
                    </h1>
                    <p className="text-slate-400 text-lg mt-2">
                        Connectez-vous à votre espace PopcornON
                    </p>
                </div>

                {/* LOGIN CARD */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="backdrop-blur-2xl bg-[#0a0a0f]/60 border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden flex items-center gap-6"
                >
                    {/* POSTER */}
                    <div className="hidden md:flex items-center justify-center shrink-0 w-[400px]">
                        <img
                            src="/popcornonposter.png"
                            alt="Popcorn Poster"
                            className="rounded-2xl shadow-xl object-contain h-[460px] w-[400px] bg-black"
                        />
                    </div>

                    {/* FORM */}
                    <div className="flex-1">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, height: 0 }}
                                        animate={{ opacity: 1, y: 0, height: "auto" }}
                                        exit={{ opacity: 0, y: -10, height: 0 }}
                                        className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3 overflow-hidden"
                                    >
                                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                        <div className="text-sm text-red-200">
                                            <p className="font-semibold text-red-400">Attention</p>
                                            <p>{error}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-200">
                                    Email
                                </Label>
                                <div className="relative group">
                                    <Mail
                                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                                            error
                                                ? "text-red-400"
                                                : "text-slate-500 group-focus-within:text-primary"
                                        }`}
                                    />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="votre@email.com"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (error) setError(null);
                                        }}
                                        className="pl-12 h-12 bg-white/5 focus:bg-white/10 rounded-xl text-white placeholder:text-slate-600"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-slate-200">
                                    Mot de passe
                                </Label>
                                <div className="relative group">
                                    <Lock
                                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                                            error
                                                ? "text-red-400"
                                                : "text-slate-500 group-focus-within:text-primary"
                                        }`}
                                    />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (error) setError(null);
                                        }}
                                        className="pl-12 h-12 bg-white/5 focus:bg-white/10 rounded-xl text-white placeholder:text-slate-600"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Remember */}
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        id="remember"
                                        checked={rememberMe}
                                        onCheckedChange={(checked) =>
                                            setRememberMe(checked as boolean)
                                        }
                                    />
                                    <Label htmlFor="remember" className="text-sm text-slate-300">
                                        Se souvenir de moi
                                    </Label>
                                </div>
                                <Link
                                    to="/auth/forgot-password"
                                    className="text-sm text-primary hover:text-primary/80"
                                >
                                    Mot de passe oublié ?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-14"
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    "Se connecter"
                                )}
                            </Button>
                        </form>

                        <div className="text-center mt-6">
                            <Link to="/register" className="text-white hover:text-primary">
                                Créer un compte gratuitement
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
