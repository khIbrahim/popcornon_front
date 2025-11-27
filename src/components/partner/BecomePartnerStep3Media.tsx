import type React from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface Step3MediaProps {
    photo: string | null;
    coverPhoto: string | null;
    handleFileSelect: (
        e: React.ChangeEvent<HTMLInputElement>,
        type: "photo" | "cover"
    ) => void;
    setPhoto: (value: string | null) => void;
    setCoverPhoto: (value: string | null) => void;
    photoInputRef: React.RefObject<HTMLInputElement>;
    coverInputRef: React.RefObject<HTMLInputElement>;
    formSummary: {
        cinemaName: string;
        city: string;
        wilaya: string;
        hallsCount: number;
        capacity: number;
    };
}

export default function BecomePartnerStep3Media({
    photo,
    coverPhoto,
    handleFileSelect,
    setPhoto,
    setCoverPhoto,
    photoInputRef,
    coverInputRef,
    formSummary
}: Step3MediaProps) {
    return (
        <div className="space-y-6">
            {/* Photo de profil */}
            <div>
                <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <ImageIcon size={16} className="text-red-500" />
                    Logo / Photo de profil
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                    Cette image sera affichée comme logo de votre cinéma.
                </p>

                <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e, "photo")}
                    className="hidden"
                />

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="h-24 w-24 rounded-2xl bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden">
                            {photo ? (
                                <img
                                    src={photo}
                                    alt="Logo"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <ImageIcon size={28} className="text-slate-600" />
                            )}
                        </div>
                        {photo && (
                            <button
                                type="button"
                                onClick={() => setPhoto(null)}
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                                <X size={12} />
                            </button>
                        )}
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={() => photoInputRef.current?.click()}
                            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
                        >
                            <Upload size={16} />
                            Choisir une image
                        </button>
                        <p className="text-xs text-slate-500 mt-2">
                            PNG, JPG ou WebP. Max 5 Mo.
                        </p>
                    </div>
                </div>
            </div>

            {/* Photo de couverture */}
            <div>
                <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <ImageIcon size={16} className="text-red-500" />
                    Photo de couverture
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                    Image de bannière affichée sur votre page publique.
                </p>

                <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e, "cover")}
                    className="hidden"
                />

                {coverPhoto ? (
                    <div className="relative rounded-xl overflow-hidden">
                        <img
                            src={coverPhoto}
                            alt="Couverture"
                            className="w-full h-40 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <button
                            type="button"
                            onClick={() => setCoverPhoto(null)}
                            className="absolute top-3 right-3 h-8 w-8 rounded-lg bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                        >
                            <X size={16} />
                        </button>
                        <button
                            type="button"
                            onClick={() => coverInputRef.current?.click()}
                            className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm font-medium flex items-center gap-2 hover:bg-white/20 transition-colors"
                        >
                            <Upload size={14} />
                            Changer
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => coverInputRef.current?.click()}
                        className="w-full h-40 rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3 hover:border-red-500/30 hover:bg-red-500/5 transition-all"
                    >
                        <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center">
                            <Upload size={20} className="text-slate-500" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-white">
                                Cliquez pour télécharger
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                                Recommandé: 1920x480px
                            </p>
                        </div>
                    </button>
                )}
            </div>

            {/* Résumé final */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <h4 className="text-sm font-medium text-white mb-3">Récapitulatif</h4>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-slate-400">Cinéma</span>
                        <span className="text-white">
                            {formSummary.cinemaName || "—"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">Localisation</span>
                        <span className="text-white">
                            {formSummary.city}, {formSummary.wilaya}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">Salles</span>
                        <span className="text-white">{formSummary.hallsCount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">Capacité</span>
                        <span className="text-white">
                            {formSummary.capacity} places
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
