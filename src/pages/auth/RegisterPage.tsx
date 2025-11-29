"use client"

import React from "react"
import { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Film, Mail, Lock, User, Phone, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "../../components/ui/button.tsx"
import { Input } from "../../components/ui/input.tsx"
import { Label } from "../../components/ui/label.tsx"
import { Checkbox } from "../../components/ui/checkbox.tsx"
import { AnimatedBackground } from "../../components/auth/AnimatedBackground.tsx"
import { ShaderOrbs } from "../../components/auth/ShaderOrbs.tsx"
import {isValidEmail} from "../../lib/validators.ts";
import {register} from "../../Api/endpoints/auth.ts";
import {useNotification} from "../../context/NotificationContext.tsx";
import { useAuth } from "../../context/AuthContext.tsx"

export default function RegisterPage() {
    const {notifySuccess, notifyError} = useNotification();
    const navigate      = useNavigate()
    const {refresh}                    = useAuth()

    const formRef = useRef<HTMLFormElement | null>(null)

    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData]   = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    })
    const [acceptTerms, setAcceptTerms] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)

    const calculatePasswordStrength = (password: string) => {
        let strength = 0
        if (password.length >= 8) strength++
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++
        if (password.match(/\d/)) strength++
        if (password.match(/[^a-zA-Z\d]/)) strength++
        return strength
    }

    const handlePasswordChange = (value: string) => {
        setFormData({ ...formData, password: value })
        setPasswordStrength(calculatePasswordStrength(value))
    }

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

        if (! email || ! password || ! confirmPassword || ! firstName || ! lastName) {
            notifyError("Tous les champs sont requis.");
            setIsLoading(false);
            return;
        }

        if (! isValidEmail(email)) {
            notifyError("Email invalide.");
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            notifyError("Les mots de passe ne correspondent pas.");
            setIsLoading(false);
            return;
        }

        if (phone && ! /^\+?[0-9]{7,15}$/.test(phone)) {
            notifyError("Numéro de téléphone invalide.");
            setIsLoading(false);
            return;
        }

        if(! acceptTerms){
            notifyError("Vous devez accepter les conditions d'utilisation.");
            setIsLoading(false);
            return;
        }

        console.log("hello");

        try {
            const res = await register({ email, password, confirmPassword, firstName, lastName, phone, acceptTerms: acceptTerms, rememberMe });

            if (res.success) {
                navigate("/");
                await refresh();
                notifySuccess("Inscription réussie !");
            } else {
                let errorMsg = "Une erreur est survenue.";

                if ('errors' in res && Array.isArray(res.errors) && res.errors.length > 0) {
                    errorMsg = res.errors[0]?.message || res.message || errorMsg;
                } else if ('message' in res) {
                    errorMsg = res.message;
                }

                notifyError(errorMsg);
            }
        } catch (error) {
            notifyError("Une erreur réseau est survenue. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    }

    const strengthColors = ["bg-destructive", "bg-accent", "bg-yellow-500", "bg-primary"]
    const strengthLabels = ["Faible", "Moyen", "Bon", "Excellent"]

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 py-12 overflow-hidden bg-background">
            <ShaderOrbs />
            <AnimatedBackground />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-2xl z-10"
            >
                {/* Header Centré */}
                <div className="flex flex-col items-center mb-8 text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                        className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-2xl shadow-primary/40 ring-1 ring-white/20"
                    >
                        <Film className="w-10 h-10 text-white" />
                    </motion.div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Rejoignez PopcornON</h1>
                    <p className="text-slate-400 text-lg mt-2">Créez votre compte pour réserver vos places</p>
                </div>

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="backdrop-blur-2xl bg-[#0a0a0f]/60 border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden"
                >
                    {/* Decorative Top Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

                    {/* Section Identité */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-slate-200">Prénom</Label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="Jean"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="pl-12 h-12 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all rounded-xl text-white placeholder:text-slate-600"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-slate-200">Nom</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Dupont"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="h-12 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all rounded-xl text-white placeholder:text-slate-600"
                                    required
                                />
                            </div>
                        </div>

                        {/* Section Contact */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-200">Email</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="votre@email.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="pl-12 h-12 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all rounded-xl text-white placeholder:text-slate-600"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-slate-200">Téléphone (Optionnel)</Label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="05 XX XX XX XX"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="pl-12 h-12 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all rounded-xl text-white placeholder:text-slate-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section Sécurité */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-slate-200">Mot de passe</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => handlePasswordChange(e.target.value)}
                                        className="pl-12 h-12 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all rounded-xl text-white placeholder:text-slate-600"
                                        required
                                    />
                                </div>
                                {/* Indicateur force mot de passe */}
                                {formData.password && (
                                    <div className="pt-1">
                                        <div className="flex gap-1 h-1 mb-1">
                                            {[0, 1, 2, 3].map((level) => (
                                                <div
                                                    key={level}
                                                    className={`flex-1 rounded-full transition-all duration-300 ${
                                                        level < passwordStrength ? strengthColors[passwordStrength - 1] : "bg-white/10"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-xs text-right text-slate-400">
                                            {passwordStrength > 0 ? strengthLabels[passwordStrength - 1] : "Trop court"}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-slate-200">Confirmer</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className="pl-12 h-12 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 transition-all rounded-xl text-white placeholder:text-slate-600"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="bg-white/5 border border-white/5 rounded-xl p-4 mt-2">
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="terms"
                                    name="acceptTerms"
                                    checked={acceptTerms}
                                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary border-white/30 h-5 w-5 rounded-md"
                                />
                                <Label htmlFor="terms" className="text-sm text-slate-300 leading-relaxed cursor-pointer select-none">
                                    J'accepte les <Link to="/terms" className="text-primary hover:underline underline-offset-4">conditions d'utilisation</Link> et la <Link to="/privacy" className="text-primary hover:underline underline-offset-4">politique de confidentialité</Link>.
                                </Label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading || ! acceptTerms}
                            className="w-full h-14 text-base bg-gradient-to-r from-primary to-accent hover:to-primary hover:opacity-90 transition-all text-white font-bold rounded-xl shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Créer mon compte
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-8 text-center space-y-4">
                        <p className="text-sm text-slate-400">
                            Vous avez déjà un compte ?{" "}
                            <Link to="/login" className="text-white hover:text-primary font-semibold transition-colors">
                                Se connecter
                            </Link>
                        </p>
                    </div>
                </motion.div>

                <div className="text-center mt-8">
                    <Link to="/" className="text-sm text-slate-500 hover:text-white transition-colors">
                        ← Retour à l'accueil
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}