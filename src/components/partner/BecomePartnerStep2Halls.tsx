import { LayoutGrid, Plus, Trash2, Users } from "lucide-react";
import type { HallForm } from "../../types/become_partner";
import {HALL_TYPES} from "../../types/halls.ts";

interface Step2HallsProps {
    halls: HallForm[];
    errors: Record<string, string>;
    addHall: () => void;
    updateHall: (index: number, field: keyof HallForm, value: string | number) => void;
    removeHall: (index: number) => void;
    capacity: number;
}

export default function BecomePartnerStep2Halls({
    halls,
    errors,
    addHall,
    updateHall,
    removeHall,
    capacity
}: Step2HallsProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                        <LayoutGrid size={16} className="text-red-500" />
                        Vos salles
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                        Configurez les salles de votre cinéma
                    </p>
                </div>
                <button
                    type="button"
                    onClick={addHall}
                    className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors flex items-center gap-1.5"
                >
                    <Plus size={14} />
                    Ajouter
                </button>
            </div>

            {errors.halls && (
                <p className="text-sm text-rose-400">{errors.halls}</p>
            )}

            {/* Liste des salles */}
            <div className="space-y-3">
                {halls.map((hall, index) => (
                    <div
                        key={index}
                        className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex-1 grid gap-4 sm:grid-cols-3">
                                {/* Nom */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        value={hall.name}
                                        onChange={(e) =>
                                            updateHall(index, "name", e.target.value)
                                        }
                                        placeholder="Salle 1"
                                        className={`w-full h-10 px-3 rounded-lg bg-white/5 border text-white text-sm outline-none transition-all focus:border-red-500/50 ${
                                            errors[`hall_${index}_name`]
                                                ? "border-rose-500"
                                                : "border-white/10"
                                        }`}
                                    />
                                </div>

                                {/* Capacité */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                        Capacité
                                    </label>
                                    <div className="relative">
                                        <Users
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                                            size={14}
                                        />
                                        <input
                                            type="number"
                                            min={1}
                                            value={hall.capacity}
                                            onChange={(e) =>
                                                updateHall(
                                                    index,
                                                    "capacity",
                                                    Number(e.target.value)
                                                )
                                            }
                                            className={`w-full h-10 pl-9 pr-3 rounded-lg bg-white/5 border text-white text-sm outline-none transition-all focus:border-red-500/50 ${
                                                errors[`hall_${index}_capacity`]
                                                    ? "border-rose-500"
                                                    : "border-white/10"
                                            }`}
                                        />
                                    </div>
                                </div>

                                {/* Type */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                        Type
                                    </label>
                                    <select
                                        value={hall.type}
                                        onChange={(e) =>
                                            updateHall(index, "type", e.target.value)
                                        }
                                        className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none cursor-pointer transition-all focus:border-red-500/50"
                                    >
                                        {HALL_TYPES.map((t) => (
                                            <option
                                                key={t.value}
                                                value={t.value}
                                                className="bg-slate-900"
                                            >
                                                {t.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Delete */}
                            <button
                                type="button"
                                onClick={() => removeHall(index)}
                                disabled={halls.length <= 1}
                                className="p-2 rounded-lg text-slate-500 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Résumé */}
            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Capacité totale</span>
                    <span className="text-lg font-bold text-white">
                        {capacity}{" "}
                        <span className="text-sm text-slate-500">places</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
