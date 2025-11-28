import { useState } from "react";
import { AlertTriangle, Trash2, Power, CheckCircle } from "lucide-react";
import Button from "../ui/Button";
import Modal from "../dashboard/modal/Modal";
import { updateCinemaStatus, deleteCinema } from "../../../Api/endpoints/cinemas";
import { useNotification } from "../../../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useCinema } from "../../../context/CinemaContext";

export default function DangerZone() {
    const { notifySuccess, notifyError } = useNotification();
    const { refresh } = useAuth();
    const navigate = useNavigate();

    const { cinema, isLoading, refreshCinema } = useCinema();
    const [isProcessing, setIsProcessing] = useState(false);

    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [confirmText, setConfirmText] = useState("");

    const isActive = cinema?.status === "active";
    const isPending = cinema?.status === "pending";

    const activateCinema = async () => {
        if (! cinema) {
            return;
        }

        setIsProcessing(true);
        try {
            await updateCinemaStatus("active");
            await refreshCinema();
            notifySuccess("Cinéma activé", "Votre cinéma est maintenant visible publiquement.");
        } catch (error) {
            console.error("Erreur:", error);
            notifyError("Erreur", "Impossible d'activer le cinéma.");
        } finally {
            setIsProcessing(false);
            setIsStatusModalOpen(false);
        }
    };

    const suspendCinema = async () => {
        if (! cinema) {
            return;
        }

        setIsProcessing(true);
        try {
            await updateCinemaStatus("suspended");
            await refreshCinema();
            notifySuccess("Cinéma désactivé", "Votre page n'est plus visible publiquement.");
        } catch (error) {
            console.error("Erreur:", error);
            notifyError("Erreur", "Impossible de désactiver le cinéma.");
        } finally {
            setIsProcessing(false);
            setIsStatusModalOpen(false);
        }
    };

    const handleToggleStatus = async () => {
        if (isActive) {
            await suspendCinema();
        } else {
            await activateCinema();
        }
    };

    const handleDelete = async () => {
        if(! cinema){
            notifyError("Erreur", "Cinéma introuvable.");
            return;
        }

        if(confirmText !== (cinema?.name || "")) {
            notifyError("Erreur", "Le nom du cinéma ne correspond pas.");
            return;
        }

        setIsProcessing(true);

        try {
            console.log("Suppression du cinéma...");
            await deleteCinema();
            await refresh();

            notifySuccess("Cinéma supprimé", "Toutes les données ont été effacées.");
            navigate("/");
        } catch (error) {
            console.error("Erreur:", error);
            notifyError("Erreur", "Impossible de supprimer le cinéma.");
        } finally {
            setIsProcessing(false);
            setIsDeleteOpen(false);
        }
    };

    const cinemaName = cinema?.name || "votre cinéma";

    const statusConfig = {
        active: { label: "Actif", color: "text-emerald-400", bg: "bg-emerald-500/10" },
        suspended: { label: "Désactivé", color: "text-orange-400", bg: "bg-orange-500/10" },
        pending: { label: "En attente", color: "text-amber-400", bg: "bg-amber-500/10" },
    };

    const currentStatus =
        cinema?.status ? statusConfig[cinema.status as "active" | "suspended" | "pending"] : null;

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="h-40 rounded-2xl bg-white/[0.02] animate-pulse" />
            </div>
        );
    }

    if (isPending) {
        return (
            <div className="space-y-6">
                {/* Carte d'information Pending */}
                <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/5">
                        <h3 className="text-base font-semibold text-white flex items-center gap-2">
                            <Power size={18} className="text-amber-400" />
                            Votre cinéma est en attente
                        </h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <p className="text-sm text-slate-300">
                            Pour publier <strong className="text-white">{cinemaName}</strong> et le rendre visible publiquement,
                            vous devez l’activer.
                        </p>
                        <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
                            <li>Votre page publique deviendra accessible</li>
                            <li>Les séances seront visibles par les visiteurs</li>
                            <li>Vous pourrez désactiver votre cinéma à tout moment</li>
                        </ul>

                        <div className="flex justify-end pt-4 border-t border-white/5">
                            <Button
                                onClick={activateCinema}
                                isLoading={isProcessing}
                                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 cursor-pointer"
                                variant="outline"
                            >
                                <CheckCircle size={16} />
                                Activer mon cinéma
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Zone danger (supprimer) — accessible même en pending */}
                <div className="rounded-2xl bg-red-500/5 border border-red-500/20 overflow-hidden">
                    <div className="px-6 py-4 border-b border-red-500/20">
                        <h3 className="text-base font-semibold text-red-400 flex items-center gap-2">
                            <AlertTriangle size={18} />
                            Zone dangereuse
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">Actions sensibles. Procédez avec précaution.</p>
                    </div>

                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div>
                                <p className="text-sm font-medium text-white">Supprimer définitivement</p>
                                <p className="text-xs text-slate-500 mt-1">
                                    Toutes vos données seront supprimées. Irréversible.
                                </p>
                            </div>
                            <Button
                                variant="destructive"
                                onClick={() => setIsDeleteOpen(true)}
                                className="cursor-pointer"
                            >
                                <Trash2 size={16} />
                                Supprimer
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Modal Supprimer */}
                <Modal
                    open={isDeleteOpen}
                    onClose={() => {
                        setIsDeleteOpen(false);
                        setConfirmText("");
                    }}
                    title="Supprimer définitivement"
                >
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                            <p className="text-sm text-red-400 flex items-start gap-2">
                                <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                                Cette action supprimera définitivement votre cinéma, tous vos films, séances et
                                données associées.
                            </p>
                        </div>

                        <p className="text-sm text-slate-300">
                            Pour confirmer, tapez <strong className="text-white">{cinemaName}</strong> ci-dessous :
                        </p>

                        <input
                            type="text"
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            placeholder={cinemaName}
                            className="w-full h-11 px-4 rounded-xl bg-white/5 border border-red-500/30 text-white placeholder:text-slate-600 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        />

                        <div className="flex justify-end gap-2 pt-4 border-t border-white/5">
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setIsDeleteOpen(false);
                                    setConfirmText("");
                                }}
                                className={"cursor-pointer"}
                            >
                                Annuler
                            </Button>
                            <Button
                                variant="destructive"
                                disabled={confirmText !== cinemaName}
                                onClick={handleDelete}
                                isLoading={isProcessing}
                                className="cursor-pointer"
                            >
                                <Trash2 size={16} />
                                Supprimer définitivement
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Statut actuel */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5">
                    <h3 className="text-base font-semibold text-white">Statut du cinéma</h3>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${currentStatus?.bg}`}>
                                {isActive ? (
                                    <CheckCircle size={20} className="text-emerald-400" />
                                ) : (
                                    <Power size={20} className={currentStatus?.color} />
                                )}
                            </div>
                            <div>
                                <p className="font-medium text-white">{cinemaName}</p>
                                <p className={`text-sm ${currentStatus?.color}`}>{currentStatus?.label}</p>
                            </div>
                        </div>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${currentStatus?.bg} ${currentStatus?.color}`}
                        >
              {currentStatus?.label}
            </span>
                    </div>
                </div>
            </div>

            {/* Zone danger */}
            <div className="rounded-2xl bg-red-500/5 border border-red-500/20 overflow-hidden">
                <div className="px-6 py-4 border-b border-red-500/20">
                    <h3 className="text-base font-semibold text-red-400 flex items-center gap-2">
                        <AlertTriangle size={18} />
                        Zone dangereuse
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">Actions sensibles. Procédez avec précaution.</p>
                </div>

                <div className="p-6 space-y-4">
                    {/* Activer / Désactiver (pending n’est plus pris en compte ici) */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div>
                            <p className="text-sm font-medium text-white">
                                {isActive ? "Désactiver le cinéma" : "Réactiver le cinéma"}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                                {isActive
                                    ? "Votre page ne sera plus visible publiquement."
                                    : "Remettre votre cinéma en ligne."}
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => setIsStatusModalOpen(true)}
                            className={
                                isActive
                                    ? "border-orange-500/30 text-orange-400 hover:bg-orange-500/10 cursor-pointer"
                                    : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 cursor-pointer"
                            }
                        >
                            <Power size={16} />
                            {isActive ? "Désactiver" : "Activer"}
                        </Button>
                    </div>

                    {/* Supprimer */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div>
                            <p className="text-sm font-medium text-white">Supprimer définitivement</p>
                            <p className="text-xs text-slate-500 mt-1">
                                Toutes vos données seront supprimées. Irréversible.
                            </p>
                        </div>
                        <Button
                            variant="destructive"
                            onClick={() => setIsDeleteOpen(true)}
                            className="cursor-pointer"
                        >
                            <Trash2 size={16} />
                            Supprimer
                        </Button>
                    </div>
                </div>
            </div>

            {/* Modal Activer/Désactiver */}
            <Modal
                open={isStatusModalOpen}
                onClose={() => setIsStatusModalOpen(false)}
                title={isActive ? "Désactiver le cinéma" : "Réactiver le cinéma"}
            >
                <div className="space-y-4">
                    {isActive ? (
                        <>
                            <p className="text-sm text-slate-300">
                                Êtes-vous sûr de vouloir désactiver{" "}
                                <strong className="text-white">{cinemaName}</strong> ?
                            </p>
                            <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
                                <li>Votre page publique ne sera plus accessible</li>
                                <li>Les séances en cours seront masquées</li>
                                <li>Vous pourrez réactiver à tout moment</li>
                            </ul>
                        </>
                    ) : (
                        <>
                            <p className="text-sm text-slate-300">
                                Réactiver <strong className="text-white">{cinemaName}</strong> ?
                            </p>
                            <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
                                <li>Votre page sera de nouveau visible</li>
                                <li>Les séances seront accessibles aux visiteurs</li>
                            </ul>
                        </>
                    )}

                    <div className="flex justify-end gap-2 pt-4 border-t border-white/5">
                        <Button variant="ghost" onClick={() => setIsStatusModalOpen(false)} className={"cursor-pointer"}>
                            Annuler
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleToggleStatus}
                            isLoading={isProcessing}
                            className={
                                isActive
                                    ? "border-orange-500/30 text-orange-400 hover:bg-orange-500/10 cursor-pointer"
                                    : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 cursor-pointer"
                            }
                        >
                            {isActive ? "Confirmer la désactivation" : "Confirmer l'activation"}
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Modal Supprimer */}
            <Modal
                open={isDeleteOpen}
                onClose={() => {
                    setIsDeleteOpen(false);
                    setConfirmText("");
                }}
                title="Supprimer définitivement"
            >
                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                        <p className="text-sm text-red-400 flex items-start gap-2">
                            <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                            Cette action supprimera définitivement votre cinéma, tous vos films, séances et
                            données associées.
                        </p>
                    </div>

                    <p className="text-sm text-slate-300">
                        Pour confirmer, tapez <strong className="text-white">{cinemaName}</strong> ci-dessous :
                    </p>

                    <input
                        type="text"
                        value={confirmText}
                        onChange={(e) => setConfirmText(e.target.value)}
                        placeholder={cinemaName}
                        className="w-full h-11 px-4 rounded-xl bg-white/5 border border-red-500/30 text-white placeholder:text-slate-600 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    />

                    <div className="flex justify-end gap-2 pt-4 border-t border-white/5">
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setIsDeleteOpen(false);
                                setConfirmText("");
                            }}
                            className={"cursor-pointer"}
                        >
                            Annuler
                        </Button>
                        <Button
                            variant="destructive"
                            disabled={confirmText !== cinemaName}
                            onClick={handleDelete}
                            isLoading={isProcessing}
                            className="cursor-pointer"
                        >
                            <Trash2 size={16} />
                            Supprimer définitivement
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}