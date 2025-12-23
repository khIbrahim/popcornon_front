import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, CheckCircle } from "lucide-react";

import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import HeroSection from "../components/partner/HeroSection.tsx";
import Avantages from "../components/partner/Avantages.tsx";

import { checkAuth } from "../Api/endpoints/auth";
import {
    createCineRequest,
    getCineStatus,
} from "../Api/endpoints/cineRequest.ts";
import type { CineStatus } from "../types/cineRequest.ts";

import {
    type User,
    type HallForm,
    type FormState,
} from "../types/become_partner";

import BecomePartnerProgressBar from "../components/partner/BecomePartnerProgressBar";
import BecomePartnerStatusCard from "../components/partner/BecomePartnerStatusCard";
import BecomePartnerAuthRequiredCard from "../components/partner/BecomePartnerAuthRequiredCard";
import BecomePartnerSuccessCard from "../components/partner/BecomePartnerSuccessCard";
import BecomePartnerNavigationButtons from "../components/partner/BecomePartnerNavigationButtons";
import BecomePartnerLoadingSpinner from "../components/partner/BecomePartnerLoadingSpinner";
import BecomePartnerStep1Info from "../components/partner/BecomePartnerStep1Info";
import BecomePartnerStep2Halls from "../components/partner/BecomePartnerStep2Halls";
import { useAuth } from "../hooks/useAuth";

export default function BecomePartnerPage() {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 2;

    const [form, setForm] = useState<FormState>({
        cinemaName: "",
        description: "",
        address: "",
        city: "",
        wilaya: "Alger",
        phone: "",
        email: "",
        website: "",
        capacity: 0,
        motivation: "",
    });

    const [halls, setHalls] = useState<HallForm[]>([
        { name: "Salle 1", capacity: 100, type: "standard" },
    ]);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [status, setStatus] = useState<CineStatus>("none");
    const [data, setData] = useState<any>(null);

    const pageState = useMemo(() => {
        if (isLoading) return "loading";
        if (!isLoggedIn) return "auth_required";
        if (submitSuccess) return "success";
        if (user?.role === "cine") return "already_partner";
        if (status === "pending") return "pending";
        if (status === "rejected") return "rejected";
        return "form";
    }, [isLoading, isLoggedIn, submitSuccess, user?.role, status]);

    useEffect(() => {
        const init = async () => {
            try {
                const auth = await checkAuth();
                if (!auth.success) {
                    setIsLoading(false);
                    return;
                }

                // @ts-ignore
                setUser(auth.data);
                setIsLoggedIn(true);

                // Ne vérifier le statut que si l'utilisateur n'est pas déjà cine
                // @ts-ignore
                if (auth.data?.role !== "cine") {
                    const cineRes = await getCineStatus();
                    setStatus(cineRes.status);
                    setData(cineRes.data);
                }
            } catch (error) {
                console.error("Erreur init:", error);
            } finally {
                setIsLoading(false);
            }
        };

        init();
    }, []);

    useEffect(() => {
        const total = halls.reduce((sum, h) => sum + h.capacity, 0);
        setForm((prev) => ({ ...prev, capacity: total }));
    }, [halls]);

    const addHall = () => {
        setHalls((prev) => [
            ...prev,
            {
                name: `Salle ${prev.length + 1}`,
                capacity: 100,
                type: "standard",
            },
        ]);
    };

    const updateHall = (
        index: number,
        field: keyof HallForm,
        value: string | number
    ) => {
        setHalls((prev) =>
            prev.map((h, i) => (i === index ? { ...h, [field]: value } : h))
        );
    };

    const removeHall = (index: number) => {
        if (halls.length <= 1) return;
        setHalls((prev) => prev.filter((_, i) => i !== index));
    };

    const validateStep = (step: number): boolean => {
        const newErrors: Record<string, string> = {};

        if (step === 1) {
            if (!form.cinemaName.trim())
                newErrors.cinemaName = "Le nom du cinéma est requis";
            if (!form.address.trim()) newErrors.address = "L'adresse est requise";
            if (!form.city.trim()) newErrors.city = "La ville est requise";
            if (!form.phone.trim()) newErrors.phone = "Le téléphone est requis";
            if (!form.email.trim()) {
                newErrors.email = "L'email est requis";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
                newErrors.email = "Email invalide";
            }
        }

        if (step === 2) {
            if (halls.length === 0) newErrors.halls = "Ajoutez au moins une salle";

            halls.forEach((hall, i) => {
                if (!hall.name.trim()) newErrors[`hall_${i}_name`] = "Nom requis";
                if (hall.capacity < 1)
                    newErrors[`hall_${i}_capacity`] = "Capacité invalide";
            });
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateStep(currentStep)) return;

        setIsSubmitting(true);

        try {
            const payload = { ...form, halls };

            // @ts-ignore
            const result = await createCineRequest(payload);

            if (result.success) {
                setSubmitSuccess(true);
                setData(result.data);
                // @ts-ignore
                setStatus(result.status);
            } else {
                const formatted: Record<string, string> = {};

                if (result.errors?.length) {
                    result.errors.forEach((e: any) => {
                        const clean = e.field.replace("body.", "");
                        formatted[clean] = e.message;
                    });
                    setErrors(formatted);
                } else {
                    setErrors({ form: result.message || "Une erreur est survenue" });
                }
            }
        } catch {
            setErrors({ form: "Erreur de connexion au serveur" });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isAdmin) {
        return;
    }

    // Rendu selon l'état
    const renderContent = () => {
        switch (pageState) {
            case "loading":
                return <BecomePartnerLoadingSpinner />;

            case "auth_required":
                return (
                    <BecomePartnerAuthRequiredCard onLogin={() => navigate("/auth")} />
                );

            case "already_partner":
                return (
                    <div className="text-center p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <CheckCircle className="text-emerald-400" size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Vous êtes déjà partenaire !
                        </h3>
                        <p className="text-slate-400 mb-6">
                            Accédez à votre dashboard pour gérer votre cinéma.
                        </p>
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-medium transition-colors"
                        >
                            <Building2 size={18} />
                            Mon Dashboard
                        </button>
                    </div>
                );

            case "pending":
                return <BecomePartnerStatusCard status="pending" data={data} />;

            case "rejected":
                return <BecomePartnerStatusCard status="rejected" data={data} />;

            case "success":
                return (
                    <BecomePartnerSuccessCard data={data} form={form} halls={halls} />
                );

            case "form":
                return (
                    <form
                        onSubmit={handleSubmit}
                        className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden"
                    >
                        <BecomePartnerProgressBar
                            currentStep={currentStep}
                            totalSteps={totalSteps}
                        />

                        {errors.form && (
                            <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm">
                                {errors.form}
                            </div>
                        )}

                        <div className="p-6">
                            {currentStep === 1 && (
                                <BecomePartnerStep1Info
                                    form={form}
                                    setForm={setForm}
                                    errors={errors}
                                />
                            )}

                            {currentStep === 2 && (
                                <BecomePartnerStep2Halls
                                    halls={halls}
                                    errors={errors}
                                    addHall={addHall}
                                    updateHall={updateHall}
                                    removeHall={removeHall}
                                    capacity={form.capacity}
                                />
                            )}
                        </div>

                        <BecomePartnerNavigationButtons
                            currentStep={currentStep}
                            totalSteps={totalSteps}
                            nextStep={nextStep}
                            prevStep={prevStep}
                            isSubmitting={isSubmitting}
                        />
                    </form>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-slate-100">
            <Navbar />

            <main className="pt-24 pb-16">
                <HeroSection />
                <Avantages />

                <section className="px-4">
                    <div className="max-w-2xl mx-auto">{renderContent()}</div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
