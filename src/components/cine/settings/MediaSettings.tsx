import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Camera } from "lucide-react";
import Button from "../ui/Button";
import { useNotification } from "../../../context/NotificationContext";

export default function MediaSettings() {
    const { notifySuccess, notifyError } = useNotification();
    const [photo, setPhoto] = useState<string | null>(null);
    const [cover, setCover] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const photoInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: "photo" | "cover") => {
        const file = e.target.files?.[0];
        if (! file) return;

        // Validation
        if (! file.type.startsWith("image/")) {
            notifyError("Fichier invalide", "Veuillez sélectionner une image.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            notifyError("Fichier trop volumineux", "L'image ne doit pas dépasser 5 Mo.");
            return;
        }

        // Preview
        const reader = new FileReader();
        reader.onload = () => {
            if (type === "photo") {
                setPhoto(reader.result as string);
            } else {
                setCover(reader. result as string);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        setIsUploading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsUploading(false);
        notifySuccess("Médias enregistrés", "Les images ont été mises à jour.");
    };

    return (
        <div className="space-y-6">
            {/* Photo de profil */}
            <div className="rounded-2xl bg-white/[0. 02] border border-white/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5">
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
                        <Camera size={18} className="text-red-500" />
                        Photo de profil
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                        Cette image sera affichée comme logo de votre cinéma.
                    </p>
                </div>

                <div className="p-6">
                    <div className="flex items-center gap-6">
                        {/* Preview */}
                        <div className="relative">
                            <div className="h-28 w-28 rounded-2xl bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden">
                                {photo ?  (
                                    <img src={photo} alt="Logo" className="w-full h-full object-cover" />
                                ) : (
                                    <ImageIcon size={32} className="text-slate-600" />
                                )}
                            </div>
                            {photo && (
                                <button
                                    onClick={() => setPhoto(null)}
                                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        {/* Upload button */}
                        <div>
                            <input
                                ref={photoInputRef}
                                type="file"
                                accept="image/*"
                                onChange={e => handleFileSelect(e, "photo")}
                                className="hidden"
                            />
                            <Button
                                variant="outline"
                                onClick={() => photoInputRef.current?.click()}
                            >
                                <Upload size={16} />
                                Choisir une image
                            </Button>
                            <p className="text-xs text-slate-500 mt-2">
                                PNG, JPG ou WebP.  Max 5 Mo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Photo de couverture */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5">
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
                        <ImageIcon size={18} className="text-red-500" />
                        Photo de couverture
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                        Image de bannière affichée en haut de votre page publique.
                    </p>
                </div>

                <div className="p-6">
                    <input
                        ref={coverInputRef}
                        type="file"
                        accept="image/*"
                        onChange={e => handleFileSelect(e, "cover")}
                        className="hidden"
                    />

                    {cover ?  (
                        <div className="relative rounded-xl overflow-hidden">
                            <img
                                src={cover}
                                alt="Couverture"
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <button
                                onClick={() => setCover(null)}
                                className="absolute top-3 right-3 h-8 w-8 rounded-lg bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                            >
                                <X size={16} />
                            </button>
                            <button
                                onClick={() => coverInputRef.current?. click()}
                                className="absolute bottom-3 right-3 px-3 py-1. 5 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm font-medium flex items-center gap-2 hover:bg-white/20 transition-colors"
                            >
                                <Upload size={14} />
                                Changer
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => coverInputRef.current?. click()}
                            className="w-full h-48 rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3 hover:border-red-500/30 hover:bg-red-500/5 transition-all"
                        >
                            <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center">
                                <Upload size={20} className="text-slate-500" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-white">Cliquez pour télécharger</p>
                                <p className="text-xs text-slate-500 mt-1">Recommandé: 1920x480px</p>
                            </div>
                        </button>
                    )}
                </div>
            </div>

            {/* Save button */}
            <div className="flex justify-end">
                <Button onClick={handleSave} isLoading={isUploading} disabled={! photo && !cover}>
                    Enregistrer les médias
                </Button>
            </div>
        </div>
    );
}