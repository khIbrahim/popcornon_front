import React, {useEffect, useState} from "react";
import { Save, Building2, MapPin, Phone, Mail, Globe, Users } from "lucide-react";
import Button from "../ui/Button";
import { useNotification } from "../../../context/NotificationContext";
import {updateCinema} from "../../../Api/endpoints/cinemas.ts";
import { WILAYAS } from "../../../constants/utils.ts";
import {useCinema} from "../../../context/CinemaContext.tsx";

export default function GeneralSettings() {
    const { notifySuccess, notifyError } = useNotification();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        address: "",
        city: "",
        wilaya: "",
        phone: "",
        email: "",
        website: "",
        capacity: 0,
    });

    const {cinema} = useCinema();
    useEffect(() => {
        if (cinema) {
            setFormData({
                name: cinema.name || "",
                description: cinema.description || "",
                address: cinema.address || "",
                city: cinema.city || "",
                wilaya: cinema.wilaya || "",
                phone: cinema.phone || "",
                email: cinema.email || "",
                website: cinema.website || "",
                capacity: cinema.capacity || 0,
            });
        }
    }, [cinema]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await updateCinema(formData);
            notifySuccess("Paramètres enregistrés", "Les informations ont été mises à jour.");
        } catch (error) {
            console.error("Erreur lors de la mise à jour des informations du cinéma :", error);
            notifyError("Erreur", "Une erreur est survenue lors de la mise à jour des informations.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Card principale */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5">
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
                        <Building2 size={18} className="text-red-500" />
                        Informations générales
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                        Ces informations seront affichées sur votre page publique.
                    </p>
                </div>

                <div className="p-6 space-y-5">
                    {/* Nom */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">
                            Nom du cinéma <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                            placeholder="Nom de votre cinéma"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData. description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none resize-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                            placeholder="Décrivez votre cinéma..."
                        />
                        <p className="text-xs text-slate-500">
                            {formData.description.length}/500 caractères
                        </p>
                    </div>

                    {/* Capacité */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                            <Users size={14} className="text-slate-500" />
                            Capacité totale
                        </label>
                        <input
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                            placeholder="Nombre de places"
                        />
                    </div>
                </div>
            </div>

            {/* Localisation */}
            <div className="rounded-2xl bg-white/[0. 02] border border-white/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5">
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
                        <MapPin size={18} className="text-red-500" />
                        Localisation
                    </h3>
                </div>

                <div className="p-6 space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                        {/* Wilaya */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">
                                Wilaya <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="wilaya"
                                value={formData. wilaya}
                                onChange={handleChange}
                                className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none cursor-pointer transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                                required
                            >
                                {WILAYAS.map(w => (
                                    <option key={w} value={w} className="bg-slate-900">{w}</option>
                                ))}
                            </select>
                        </div>

                        {/* Ville */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">
                                Ville <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData. city}
                                onChange={handleChange}
                                className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                                placeholder="Ville"
                                required
                            />
                        </div>
                    </div>

                    {/* Adresse */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">
                            Adresse complète <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                            placeholder="Rue, numéro..."
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Contact */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5">
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
                        <Phone size={18} className="text-red-500" />
                        Contact
                    </h3>
                </div>

                <div className="p-6 space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                        {/* Téléphone */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                <Phone size={14} className="text-slate-500" />
                                Téléphone
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                                placeholder="+213 XX XX XX XX"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                <Mail size={14} className="text-slate-500" />
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData. email}
                                onChange={handleChange}
                                className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                                placeholder="contact@cinema. dz"
                            />
                        </div>
                    </div>

                    {/* Website */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                            <Globe size={14} className="text-slate-500" />
                            Site web
                        </label>
                        <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                            placeholder="https://votre-cinema. dz"
                        />
                    </div>
                </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4">
                <Button type="submit" isLoading={isLoading} className={'cursor-pointer'}>
                    <Save size={16} />
                    Enregistrer les modifications
                </Button>
            </div>
        </form>
    );
}