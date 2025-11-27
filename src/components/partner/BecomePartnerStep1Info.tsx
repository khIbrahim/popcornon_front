import type React from "react";
import { Building2, MapPin, Phone, Mail, Globe, FileText } from "lucide-react";
import {type FormState } from "../../types/become_partner";
import {WILAYAS} from "../../constants/utils.ts";

interface Step1InfoProps {
    form: FormState;
    setForm: React.Dispatch<React.SetStateAction<FormState>>;
    errors: Record<string, string>;
}

export default function BecomePartnerStep1Info({
    form,
    setForm,
    errors
}: Step1InfoProps) {
    return (
        <div className="space-y-6">
            {/* Infos générales */}
            <div>
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <Building2 size={16} className="text-red-500" />
                    Informations générales
                </h3>
                <div className="space-y-4">
                    {/* Nom du cinéma */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            Nom du cinéma <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.cinemaName}
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, cinemaName: e.target.value }))
                            }
                            placeholder="Ex: Cinéma Ibn Khaldoun"
                            className={`w-full h-11 px-4 rounded-xl bg-white/5 border text-white placeholder:text-slate-500 outline-none transition-all focus:ring-2 focus:ring-red-500/20 ${
                                errors.cinemaName
                                    ? "border-rose-500"
                                    : "border-white/10 focus:border-red-500/50"
                            }`}
                        />
                        {errors.cinemaName && (
                            <p className="mt-1 text-xs text-rose-400">
                                {errors.cinemaName}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            Description
                        </label>
                        <textarea
                            value={form.description}
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, description: e.target.value }))
                            }
                            placeholder="Présentez votre cinéma..."
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none resize-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                            {form.description.length}/500
                        </p>
                    </div>
                </div>
            </div>

            {/* Localisation */}
            <div>
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <MapPin size={16} className="text-red-500" />
                    Localisation
                </h3>
                <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        {/* Wilaya */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                Wilaya <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={form.wilaya}
                                onChange={(e) =>
                                    setForm((prev) => ({ ...prev, wilaya: e.target.value }))
                                }
                                className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none cursor-pointer transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                            >
                                {WILAYAS.map((w) => (
                                    <option key={w} value={w} className="bg-slate-900">
                                        {w}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Ville */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                Ville <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={form.city}
                                onChange={(e) =>
                                    setForm((prev) => ({ ...prev, city: e.target.value }))
                                }
                                placeholder="Ex: Alger Centre"
                                className={`w-full h-11 px-4 rounded-xl bg-white/5 border text-white placeholder:text-slate-500 outline-none transition-all focus:ring-2 focus:ring-red-500/20 ${
                                    errors.city
                                        ? "border-rose-500"
                                        : "border-white/10 focus:border-red-500/50"
                                }`}
                            />
                            {errors.city && (
                                <p className="mt-1 text-xs text-rose-400">{errors.city}</p>
                            )}
                        </div>
                    </div>

                    {/* Adresse */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            Adresse complète <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.address}
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, address: e.target.value }))
                            }
                            placeholder="Rue, numéro, quartier..."
                            className={`w-full h-11 px-4 rounded-xl bg-white/5 border text-white placeholder:text-slate-500 outline-none transition-all focus:ring-2 focus:ring-red-500/20 ${
                                errors.address
                                    ? "border-rose-500"
                                    : "border-white/10 focus:border-red-500/50"
                            }`}
                        />
                        {errors.address && (
                            <p className="mt-1 text-xs text-rose-400">{errors.address}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Contact */}
            <div>
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <Phone size={16} className="text-red-500" />
                    Contact
                </h3>
                <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        {/* Téléphone */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                Téléphone <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                <input
                                    type="tel"
                                    value={form.phone}
                                    onChange={(e) =>
                                        setForm((prev) => ({ ...prev, phone: e.target.value }))
                                    }
                                    placeholder="0555 XX XX XX"
                                    className={`w-full h-11 pl-10 pr-4 rounded-xl bg-white/5 border text-white placeholder:text-slate-500 outline-none transition-all focus:ring-2 focus:ring-red-500/20 ${
                                        errors.phone
                                            ? "border-rose-500"
                                            : "border-white/10 focus:border-red-500/50"
                                    }`}
                                />
                            </div>
                            {errors.phone && (
                                <p className="mt-1 text-xs text-rose-400">{errors.phone}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm((prev) => ({ ...prev, email: e.target.value }))
                                    }
                                    placeholder="contact@cinema.dz"
                                    className={`w-full h-11 pl-10 pr-4 rounded-xl bg-white/5 border text-white placeholder:text-slate-500 outline-none transition-all focus:ring-2 focus:ring-red-500/20 ${
                                        errors.email
                                            ? "border-rose-500"
                                            : "border-white/10 focus:border-red-500/50"
                                    }`}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-xs text-rose-400">{errors.email}</p>
                            )}
                        </div>
                    </div>

                    {/* Website */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            Site web <span className="text-slate-500">(optionnel)</span>
                        </label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                            <input
                                type="url"
                                value={form.website}
                                onChange={(e) =>
                                    setForm((prev) => ({ ...prev, website: e.target.value }))
                                }
                                placeholder="https://votre-cinema.dz"
                                className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Motivation */}
            <div>
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <FileText size={16} className="text-red-500" />
                    Motivation
                </h3>
                <textarea
                    value={form.motivation}
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, motivation: e.target.value }))
                    }
                    placeholder="Pourquoi souhaitez-vous rejoindre CinéDZ ? Parlez-nous de votre projet..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none resize-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                />
            </div>
        </div>
    );
}
