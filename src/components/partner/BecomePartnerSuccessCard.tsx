import { CheckCircle } from "lucide-react";
import type { FormState, HallForm } from "../../types/become_partner";

interface SuccessCardProps {
    data: any;
    form: FormState;
    halls: HallForm[];
}

export default function BecomePartnerSuccessCard({
                                                     data,
                                                     form,
                                                     halls
                                                 }: SuccessCardProps) {
    return (
        <div className="text-center p-8 rounded-2xl bg-white/[0.02] border border-emerald-500/30">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle className="text-emerald-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Demande envoyée !</h3>
            <p className="text-slate-400 mb-2">
                Cinéma :{" "}
                <span className="text-white font-medium">
                    {data?.cinemaName || form.cinemaName}
                </span>
            </p>
            <p className="text-slate-400 mb-1">
                {halls.length} salle(s) • {form.capacity} places
            </p>
            <p className="text-slate-500 text-sm mt-4">
                Nous examinerons votre demande dans les plus brefs délais.
            </p>
        </div>
    );
}
