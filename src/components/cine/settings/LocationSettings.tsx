import { useState, useEffect } from "react";
import { Save, MapPin, Info } from "lucide-react";
import Button from "../ui/Button";
import LocationPicker from "./LocationPicker";
import { useNotification } from "../../../context/NotificationContext";
import { useCinema } from "../../../context/CinemaContext";
import { updateCinema } from "../../../Api/endpoints/cinemas";

export default function LocationSettings() {
    const { notifySuccess, notifyError } = useNotification();
    const { cinema, refreshCinema }      = useCinema();
    const [isLoading, setIsLoading]      = useState(false);
    const [coordinates, setCoordinates]  = useState<[number, number] | null>(null);

    useEffect(() => {
        if (cinema?.location?.coordinates) {
            const [lng, lat] = cinema.location.coordinates;
            if (lng !== 0 || lat !== 0) {
                setCoordinates([lng, lat]);
            }
        }
    }, [cinema]);

    const handleSave = async () => {
        console.log("hello")
        setIsLoading(true);

        try {
            await updateCinema({
                location: coordinates ? { type: "Point", coordinates } : { type: "Point", coordinates: [0, 0] }
            });
            await refreshCinema();
            notifySuccess("Position enregistrée", "La localisation a été mise à jour.");
        } catch (error) {
            console.error("Erreur:", error);
            notifyError("Erreur", "Impossible de sauvegarder la position.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Card principale */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5">
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
                        <MapPin size={18} className="text-red-500" />
                        Position géographique
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                        Définissez l'emplacement de votre cinéma pour apparaître sur la carte.
                    </p>
                </div>

                <div className="p-6">
                    <LocationPicker value={coordinates} onChange={setCoordinates} />
                </div>
            </div>

            {/* Info box */}
            <div className="flex gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                <Info size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-300/80">
                    <p className="font-medium text-blue-400 mb-1">Pourquoi c'est important ? </p>
                    <p>
                        Votre position permet aux visiteurs de vous trouver sur la carte et de
                        découvrir les cinémas près de chez eux.
                    </p>
                </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
                <Button
                    onClick={() => handleSave()}
                    isLoading={isLoading}
                    className="cursor-pointer"
                >
                    <Save size={16} />
                    Enregistrer la position
                </Button>
            </div>
        </div>
    );
}