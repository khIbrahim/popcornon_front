import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Building2,
    MapPin,
    Phone,
    FileText,
    Send,
    CheckCircle,
    Clock,
    XCircle,
    ArrowLeft,
} from "lucide-react";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import { checkAuth } from "../Api/endpoints/auth";
import {createCineRequest, getCineStatus} from "../Api/endpoints/cineRequest.ts";
import type {CineStatus} from "../types/cineRequest.ts";
import HeroSection from "../components/partner/HeroSection.tsx";
import Avantages from "../components/partner/Avantages.tsx";
import { Mail } from "lucide-react";

interface User {
    firstName: string;
    lastName: string;
    role: "user" | "admin" | "cine";
}

const statusConfig = {
    pending: {
        icon: Clock,
        label: "En attente",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/30"
    },
    approved: {
        icon: CheckCircle,
        label: "Approuvée",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30"
    },
    rejected: {
        icon: XCircle,
        label: "Refusée",
        color: "text-rose-400",
        bg: "bg-rose-500/10",
        border: "border-rose-500/30"
    }
};

export default function BecomePartnerPage() {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const [form, setForm] = useState({
        cinemaName: "",
        address: "",
        phone: "",
        email: "",
        motivation: ""
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [status, setStatus] = useState<CineStatus>("none");
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const init = async () => {
            const auth = await checkAuth();
            if (! auth.success) {
                setIsLoading(false);
                return;
            }

            setUser(auth.data);
            setIsLoggedIn(true);

            const cineRes = await getCineStatus();
            setStatus(cineRes.status);
            setData(cineRes.data);
            setIsLoading(false);
        };

        init();
    }, []);

    // Validation
    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (! form.cinemaName.trim()) {
            newErrors.cinemaName = "Le nom du cinéma est requis";
        }

        if(! form.address.trim()) {
            newErrors.address = "L'adresse est requise";
        }

        if(! form.email.trim()) {
            newErrors.email = "L'email est requis";
        }

        if(! form.phone.trim()) {
            newErrors.phone = "Le numéro de téléphone est requis";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (! validate()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const data = await createCineRequest(form);

            if (data.success) {
                setSubmitSuccess(true);
                setData(data.data);
                setStatus(data.status);
            } else {
                setErrors({ form: "Une erreur est survenue" });
            }
        } catch {
            setErrors({ form: "Erreur de connexion au serveur" });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Already cine
    if (!isLoading && user?.role === "cine") {
        return (
            <div className="min-h-screen bg-slate-900 text-slate-100">
                <Navbar isLoggedIn={isLoggedIn} user={user} />

                <main className="pt-24 pb-16 px-4">
                    <div className="max-w-lg mx-auto text-center">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                            <CheckCircle className="text-emerald-400" size={40} />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-3">
                            Vous êtes déjà partenaire !
                        </h1>
                        <p className="text-slate-400 mb-8">
                            Accédez à votre dashboard pour gérer votre cinéma.
                        </p>
                        <button
                            onClick={() => navigate("/dashboard/cinema")}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-medium transition-colors"
                        >
                            <Building2 size={18} />
                            Mon Dashboard
                        </button>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100">
            <Navbar isLoggedIn={isLoggedIn} user={user || undefined} />

            <main className="pt-24 pb-16">
                {/* Hero */}
                <HeroSection/>

                {/* Avantages */}
                <Avantages />

                {/* Formulaire ou Status */}
                <section className="px-4">
                    <div className="max-w-xl mx-auto">

                        {/* Loading */}
                        {isLoading && (
                            <div className="text-center py-12">
                                <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" />
                            </div>
                        )}

                        {/* Not logged in */}
                        {!isLoading && !isLoggedIn && (
                            <div className="text-center p-8 rounded-2xl bg-slate-800/50 border border-slate-700">
                                <p className="text-slate-300 mb-4">Connectez-vous pour soumettre votre demande.</p>
                                <button onClick={() => navigate("/auth")} className="px-6 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl font-medium transition-colors">
                                    Se connecter
                                </button>
                            </div>
                        )}

                        {/* Déjà cinéma */}
                        {!isLoading && status === "cinema" && (
                            <div className="text-center p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                                <CheckCircle className="mx-auto text-emerald-400 mb-4" size={40} />
                                <h3 className="text-xl font-semibold text-white mb-2">Vous êtes déjà partenaire !</h3>
                                <p className="text-slate-400 mb-4">Accédez à votre dashboard pour gérer votre cinéma.</p>
                                <button onClick={() => navigate("/dashboard/cinema")} className="px-6 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl font-medium transition-colors inline-flex items-center gap-2">
                                    <Building2 size={18} />
                                    Mon Dashboard
                                </button>
                            </div>
                        )}

                        {/* Demande pending / rejected */}
                        {!isLoading && (status === "pending" || status === "rejected") && (() => {
                            const config = statusConfig[status];
                            const Icon = config.icon;
                            return (
                                <div className={`p-6 rounded-2xl ${config.bg} border ${config.border}`}>
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-xl ${config.bg} border ${config.border}`}>
                                            <Icon className={config.color} size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-white mb-1">{data?.cinemaName}</h3>
                                            <p className="text-sm text-slate-400 mb-3">
                                                {data?.address} • Demande du {new Date(data?.createdAt).toLocaleDateString("fr-FR")}
                                            </p>
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} border ${config.border} ${config.color}`}>
                        {config.label}
                    </span>
                                            {data?.adminNote && (
                                                <p className="mt-4 p-3 rounded-lg bg-slate-900/50 text-sm text-slate-300 border border-slate-700">
                                                    <span className="text-slate-500">Note admin : </span>{data.adminNote}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}

                        {/* Success après soumission */}
                        {!isLoading && submitSuccess && (
                            <div className="text-center p-8 rounded-2xl bg-slate-800/50 border border-emerald-500/30">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                    <CheckCircle className="text-emerald-400" size={32} />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Demande envoyée !</h3>
                                <p className="text-slate-400 mb-2">Cinéma : <span className="text-white">{data?.cinemaName}</span></p>
                                <p className="text-slate-400">Nous examinerons votre demande dans les plus brefs délais.</p>
                            </div>
                        )}

                        {/* Form */}
                        {!isLoading && isLoggedIn && status === "none" && !submitSuccess && (
                            <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
                                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                                    <Building2 size={20} className="text-red-500" />
                                    Informations du cinéma
                                </h2>

                                {/* Error global */}
                                {errors.form && (
                                    <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm">
                                        {errors.form}
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {/* Nom du cinéma */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                            Nom du cinéma *
                                        </label>
                                        <div className="relative">
                                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                            <input
                                                type="text"
                                                value={form.cinemaName}
                                                onChange={(e) => setForm({ ...form, cinemaName: e.target.value })}
                                                placeholder="Ex: Cinéma Ibn Khaldoun"
                                                className={`w-full h-11 pl-10 pr-4 rounded-xl bg-slate-900/50 border text-white placeholder:text-slate-500 outline-none transition-colors ${
                                                    errors.cinemaName
                                                        ? "border-rose-500 focus:border-rose-500"
                                                        : "border-slate-700 focus:border-red-500"
                                                }`}
                                            />
                                        </div>
                                        {errors.cinemaName && (
                                            <p className="mt-1 text-xs text-rose-400">{errors.cinemaName}</p>
                                        )}
                                    </div>

                                    {/* Adresse */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                            Adresse complète
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                            <input
                                                type="text"
                                                value={form.address}
                                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                                                placeholder="Rue, quartier..."
                                                className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-900/50 border border-slate-700 focus:border-red-500 text-white placeholder:text-slate-500 outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                            Email de contact
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                            <input
                                                type="email"
                                                value={form.email}
                                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                placeholder="contact@cinema.dz"
                                                className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-900/50 border border-slate-700 focus:border-red-500 text-white placeholder:text-slate-500 outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Téléphone */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                            Téléphone
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                            <input
                                                type="tel"
                                                value={form.phone}
                                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                placeholder="0555 XX XX XX"
                                                className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-900/50 border border-slate-700 focus:border-red-500 text-white placeholder:text-slate-500 outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Motivation */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                            Pourquoi souhaitez-vous rejoindre CinéDz ?
                                        </label>
                                        <div className="relative">
                                            <FileText className="absolute left-3 top-3 text-slate-500" size={18} />
                                            <textarea
                                                value={form.motivation}
                                                onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                                                placeholder="Parlez-nous de votre cinéma..."
                                                rows={4}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 focus:border-red-500 text-white placeholder:text-slate-500 outline-none transition-colors resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                    <button
                                        type="button"
                                        onClick={() => navigate(-1)}
                                        className="flex-1 h-11 px-4 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <ArrowLeft size={18} />
                                        Retour
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 h-11 px-4 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                Envoyer ma demande
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}