import { Clock, Save } from "lucide-react";
import Button from "../ui/Button";
import { useNotification } from "../../../context/NotificationContext";
import { useOpeningHours } from "../../../hooks/useOpeningHours";
import type {DayKey} from "../../../types/openingHours.ts";

const DAYS: { key: DayKey; label: string }[] = [
    { key: "monday", label: "Lundi" },
    { key: "tuesday", label: "Mardi" },
    { key: "wednesday", label: "Mercredi" },
    { key: "thursday", label: "Jeudi" },
    { key: "friday", label: "Vendredi" },
    { key: "saturday", label: "Samedi" },
    { key: "sunday", label: "Dimanche" },
];

export default function HoursSettings() {
    const { notifySuccess, notifyError } = useNotification();

    const {
        hours,
        isLoading,
        isUpdating,
        error,
        updateDay,
        save,
    } = useOpeningHours();

    const handleSave = async () => {
        try {
            save();
            notifySuccess("Succès", "Horaires mis à jour avec succès.");
        } catch (e) {
            notifyError("Erreur", "Une erreur est survenue lors de la mise à jour des horaires.");
        }
    };

    if (isLoading) {
        return <p className="text-slate-500">Chargement des horaires...</p>;
    }

    if (error || ! hours) {
        return <p className="text-red-500">Erreur lors du chargement des horaires.</p>;
    }

    return (
        <div className="space-y-6">
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5">
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
                        <Clock size={18} className="text-red-500" />
                        Horaires d'ouverture
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                        Définissez vos horaires pour chaque jour de la semaine.
                    </p>
                </div>

                <div className="divide-y divide-white/5">
                    {DAYS.map((day) => (
                        <div key={day.key} className="px-6 py-4 flex items-center gap-4">
                            <div className="w-28">
                                <p className="text-sm font-medium text-white">
                                    {day.label}
                                </p>
                            </div>

                            {/* Switch Fermé */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={hours[day.key].closed}
                                    onChange={(e) =>
                                        updateDay(day.key, "closed", e.target.checked)
                                    }
                                    className="sr-only peer"
                                />
                                <div className="w-9 h-5 rounded-full bg-white/10 peer-checked:bg-red-500/20 relative transition-colors">
                                    <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-slate-400 peer-checked:bg-red-500 peer-checked:translate-x-4 transition-all" />
                                </div>
                                <span className="text-xs text-slate-500">Fermé</span>
                            </label>

                            {/* Inputs horaires */}
                            {!hours[day.key].closed && (
                                <div className="flex items-center gap-2 ml-auto">
                                    <input
                                        type="time"
                                        value={hours[day.key].open}
                                        onChange={(e) =>
                                            updateDay(day.key, "open", e.target.value)
                                        }
                                        className="h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-red-500/50"
                                    />

                                    <span className="text-slate-500">→</span>

                                    <input
                                        type="time"
                                        value={hours[day.key].close}
                                        onChange={(e) =>
                                            updateDay(day.key, "close", e.target.value)
                                        }
                                        className="h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-red-500/50"
                                    />
                                </div>
                            )}

                            {/* Message "fermé" */}
                            {hours[day.key].closed && (
                                <p className="text-sm text-slate-500 ml-auto">
                                    Fermé ce jour
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <Button onClick={handleSave} isLoading={isUpdating} className="cursor-pointer">
                    <Save size={16} />
                    Enregistrer
                </Button>
            </div>
        </div>
    );
}