import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {Film, Mail, Lock, ArrowRight, Loader2, AlertCircle, Github, Facebook, Chrome} from "lucide-react"
import { ShaderOrbs } from "../../components/auth/ShaderOrbs.tsx"
import { AnimatedBackground } from "../../components/auth/AnimatedBackground.tsx"
import { Button } from "../../components/ui/button.tsx"
import { Input } from "../../components/ui/input.tsx"
import { Label } from "../../components/ui/label.tsx"
import { Checkbox } from "../../components/ui/checkbox.tsx"
import { Link, useNavigate } from "react-router-dom"
import { isValidEmail } from "../../lib/validators.ts"
import { login } from "../../Api/endpoints/auth.ts"
import { useAuth } from "../../context/AuthContext.tsx"
import { useNotification } from "../../context/NotificationContext.tsx"

export default function LoginPage() {
    const navigate = useNavigate()
    const { refresh } = useAuth()
    const { notifySuccess, notifyError } = useNotification() // Ajout de notifyError

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null) // État pour l'erreur locale
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null) // Réinitialiser l'erreur au début
        setIsLoading(true)

        if (! email || !password) {
            const msg = "Veuillez remplir tous les champs."
            setError(msg)
            notifyError("Erreur de formulaire", msg)
            setIsLoading(false)
            return
        }

        if (! isValidEmail(email)) {
            const msg = "L'adresse email n'est pas valide."
            setError(msg)
            setIsLoading(false)
            return
        }

        try {
            const res = await login({ email, password, rememberMe })

            if (res.success) {
                notifySuccess("Connexion réussie !", "Ravi de vous revoir.")
                await refresh()
                navigate("/")
            } else {
                const msg = res.message || "Email ou mot de passe incorrect."
                setError(msg)
                notifyError("Échec de connexion", msg)
            }
        } catch (err) {
            const msg = "Une erreur inattendue est survenue. Vérifiez votre connexion."
            setError(msg)
            notifyError("Erreur système", "Impossible de contacter le serveur.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-background">
            {/* Animated shader background */}
            <ShaderOrbs />
            <AnimatedBackground />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-lg z-10"
            >
                {/* Header Centré & Grand */}
                <div className="flex flex-col items-center mb-8 text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                        className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-2xl shadow-primary/40 ring-1 ring-white/20"
                    >
                        <Film className="w-10 h-10 text-white" />
                    </motion.div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Bon retour</h1>
                    <p className="text-slate-400 text-lg mt-2">Connectez-vous à votre espace PopcornON</p>
                </div>

                {/* Login card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="backdrop-blur-2xl bg-[#0a0a0f]/60 border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden"
                >
                    {/* Decorative Top Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Zone d'affichage de l'erreur */}
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

                        {/* Email field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-200">
                                Email
                            </Label>
                            <div className="relative group">
                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${error ? 'text-red-400' : 'text-slate-500 group-focus-within:text-primary'}`} />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="votre@email.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        if(error) setError(null) // Enlever l'erreur quand l'utilisateur tape
                                    }}
                                    className={`pl-12 h-12 bg-white/5 focus:bg-white/10 transition-all rounded-xl text-white placeholder:text-slate-600 ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-primary/50'}`}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password field */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-slate-200">
                                Mot de passe
                            </Label>
                            <div className="relative group">
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${error ? 'text-red-400' : 'text-slate-500 group-focus-within:text-primary'}`} />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        if(error) setError(null)
                                    }}
                                    className={`pl-12 h-12 bg-white/5 focus:bg-white/10 transition-all rounded-xl text-white placeholder:text-slate-600 ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-primary/50'}`}
                                    required
                                />
                            </div>
                        </div>

                        {/* Remember me & Forgot password */}
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="remember"
                                    checked={rememberMe}
                                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary border-white/30 h-5 w-5 rounded-md cursor-pointer transition-all"
                                />
                                <Label htmlFor="remember" className="text-sm text-slate-300 cursor-pointer select-none">
                                    Se souvenir de moi
                                </Label>
                            </div>
                            <Link
                                to="/auth/forgot-password"
                                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors hover:underline underline-offset-4"
                            >
                                Mot de passe oublié ?
                            </Link>
                        </div>

                        {/* Submit button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 text-base bg-gradient-to-r from-primary to-accent hover:to-primary hover:opacity-90 transition-all text-white font-bold rounded-xl shadow-lg shadow-primary/20 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Se connecter
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase tracking-wider">
                            <span className="bg-[#0f1016] px-4 text-slate-500">ou continuer avec</span>
                        </div>
                    </div>

                    {/* Nouveaux Boutons d'Authentification Sociale */}
                    <div className="grid grid-cols-3 gap-4">
                        {/* Bouton Google */}
                        <Button
                            variant="outline"
                            className="w-full h-12 bg-white/5 border-white/10 hover:bg-white/10 text-white font-semibold transition-colors rounded-xl flex items-center justify-center group"
                            onClick={() => console.log('Login with Google')}
                            disabled={isLoading}
                        >
                            {/* Chrome est souvent utilisé comme l'icône Google dans Lucide */}
                            <Chrome className="w-5 h-5 mr-2 text-red-500 group-hover:text-red-400 transition-colors" />
                            Google
                        </Button>

                        {/* Bouton GitHub */}
                        <Button
                            variant="outline"
                            className="w-full h-12 bg-white/5 border-white/10 hover:bg-white/10 text-white font-semibold transition-colors rounded-xl flex items-center justify-center group"
                            onClick={() => console.log('Login with Github')}
                            disabled={isLoading}
                        >
                            <Github className="w-5 h-5 mr-2 text-white group-hover:text-slate-200 transition-colors" />
                            Github
                        </Button>

                        {/* Bouton Facebook (Choix pour la région Algérie/Maghreb) */}
                        <Button
                            variant="outline"
                            className="w-full h-12 bg-white/5 border-white/10 hover:bg-white/10 text-white font-semibold transition-colors rounded-xl flex items-center justify-center group"
                            onClick={() => console.log('Login with Facebook')}
                            disabled={isLoading}
                        >
                            <Facebook className="w-5 h-5 mr-2 text-blue-500 group-hover:text-blue-400 transition-colors" />
                            Facebook
                        </Button>
                    </div>

                    {/* Register link */}
                    <div className="text-center space-y-4 mt-6">
                        <p className="text-sm text-slate-400">
                            Pas encore de compte ?{" "}
                            <Link to="/register" className="text-white hover:text-primary font-semibold transition-colors">
                                Créer un compte gratuitement
                            </Link>
                        </p>
                    </div>
                </motion.div>

                {/* Back to home */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-8"
                >
                    <Link to="/" className="text-sm text-slate-500 hover:text-white transition-colors">
                        ← Retour à l'accueil
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    )
}