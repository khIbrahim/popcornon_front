interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

export default function BecomePartnerProgressBar({
                                                     currentStep,
                                                     totalSteps
                                                 }: ProgressBarProps) {
    const labels = ["Informations", "Salles"];

    return (
        <div className="px-6 py-4 border-b border-white/5">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-white">Nouvelle demande</h2>
                <span className="text-sm text-slate-500">
                    Étape {currentStep}/{totalSteps}
                </span>
            </div>

            {/* BARRE DE PROGRESSION */}
            <div className="flex gap-2">
                {Array.from({ length: totalSteps }, (_, i) => {
                    const step = i + 1;
                    return (
                        <div
                            key={step}
                            className={`flex-1 h-1.5 rounded-full transition-colors ${
                                step <= currentStep ? "bg-red-500" : "bg-white/10"
                            }`}
                        />
                    );
                })}
            </div>

            {/* LABELS */}
            <div className="flex justify-between mt-2 text-xs text-slate-500">
                {labels.map((label, i) => {
                    const active = currentStep >= i + 1;

                    return (
                        <span
                            key={label}
                            className={active ? "text-red-400" : ""}
                        >
                            {label}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
