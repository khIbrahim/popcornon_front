import React, { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, Users, Tv } from "lucide-react";
import Button from "../ui/Button";
import Modal from "../dashboard/modal/Modal";
import { useNotification } from "../../../context/NotificationContext";
import { useHalls } from "../../../hooks/useHalls";
import type { CinemaHall } from "../../../types/halls";
import { HALL_TYPES } from "../../../types/halls";

export default function HallsSettings() {
    const { notifySuccess, notifyError } = useNotification();

    const {
        halls,
        setHalls,
        isLoading,
        isSaving,
        error,
        save
    } = useHalls();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const [form, setForm] = useState({
        name: "",
        capacity: 100,
        type: "standard" as CinemaHall["type"],
    });

    useEffect(() => {
        if (!isModalOpen && editingIndex !== null && halls) {
            setForm(halls[editingIndex]);
        }
    }, [halls]);

    if (isLoading) {
        return <p className="text-slate-500">Chargement…</p>;
    }
    if (error || ! halls) {
        return <p className="text-red-500">Erreur au chargement.</p>;
    }

    const openAddModal = () => {
        setEditingIndex(null);
        setForm({ name: "", capacity: 100, type: "standard" });
        setIsModalOpen(true);
    };

    const openEditModal = (hall: CinemaHall, index: number) => {
        setEditingIndex(index);
        setForm(hall);
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let newHalls: CinemaHall[];

            if (editingIndex !== null) {
                newHalls = halls!.map((h, i) =>
                    i === editingIndex ? form : h
                );

                notifySuccess("Salle modifiée", "Les modifications ont bien été enregistrées.");
            } else {
                newHalls = [...halls!, form];

                notifySuccess("Salle ajoutée", "Nouvelle salle créée.");
            }

            setHalls(newHalls);

            save(newHalls);
        } catch (err) {
            notifyError("Erreur", "Impossible d’enregistrer.");
        }

        setIsModalOpen(false);
    };

    const handleDelete = (index: number) => {
        try {
            setHalls(prev => prev!.filter((_, i) => i !== index));

            save(halls.filter((_, i) => i !== index));

            notifySuccess("Salle supprimée", "Suppression réussie.");
        } catch (err) {
            notifyError("Erreur", "Impossible de supprimer la salle.");
        }
    };

    const getTypeIcon = (type: CinemaHall["type"]) => {
        const found = HALL_TYPES.find(t => t.value === type);
        return found?.icon || Tv;
    };

    const totalCapacity = halls.reduce((sum, h) => sum + h.capacity, 0);

    return (
        <div className="space-y-6">

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-5">
                    <p className="text-sm text-slate-400">Nombre de salles</p>
                    <p className="mt-1 text-2xl font-bold text-white">{halls.length}</p>
                </div>
                <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-5">
                    <p className="text-sm text-slate-400">Capacité totale</p>
                    <p className="mt-1 text-2xl font-bold text-white">
                        {totalCapacity} <span className="text-base text-slate-500">places</span>
                    </p>
                </div>
            </div>

            {/* Halls list */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-base font-semibold text-white">Vos salles</h3>
                    <Button onClick={openAddModal} className="cursor-pointer">
                        <Plus size={16} />
                        Ajouter
                    </Button>
                </div>

                <div className="divide-y divide-white/5">
                    {halls.map((hall, index) => {
                        const Icon = getTypeIcon(hall.type);
                        return (
                            <div key={index} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center">
                                        <Icon size={18} className="text-red-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{hall.name}</p>
                                        <p className="text-xs text-slate-500 flex items-center gap-2">
                                            <Users size={12} />
                                            {hall.capacity} places
                                            <span className="px-1.5 py-0.5 rounded-md bg-white/5 text-[10px] uppercase">
                                                {hall.type}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => openEditModal(hall, index)}
                                        className="p-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                                    >
                                        <Edit3 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="p-2 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    {halls.length === 0 && (
                        <div className="px-6 py-12 text-center">
                            <p className="text-slate-500">Aucune salle configurée</p>
                            <Button onClick={openAddModal} variant="ghost" className="mt-4">
                                <Plus size={16} />
                                Ajouter une salle
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingIndex !== null ? "Modifier la salle" : "Nouvelle salle"}
            >
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Nom de la salle</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Capacité</label>
                        <input
                            type="number"
                            min={1}
                            value={form.capacity}
                            onChange={e => setForm(prev => ({ ...prev, capacity: Number(e.target.value) }))}
                            className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Type</label>
                        <div className="grid grid-cols-2 gap-2">
                            {HALL_TYPES.map(type => (
                                <button
                                    key={type.value}
                                    type="button"
                                    onClick={() => setForm(prev => ({ ...prev, type: type.value as CinemaHall["type"] }))}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all cursor-pointer ${
                                        form.type === type.value
                                            ? "bg-red-500/10 border-red-500/50 text-red-400"
                                            : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                                    }`}
                                >
                                    <type.icon size={16} />
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t border-white/5">
                        <Button type="button" variant="ghost" className="cursor-pointer" onClick={() => setIsModalOpen(false)}>
                            Annuler
                        </Button>
                        <Button type="submit" className="cursor-pointer" isLoading={isSaving}>
                            {editingIndex !== null ? "Enregistrer" : "Ajouter"}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}