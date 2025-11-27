interface Props {
    currentStep: number;
    totalSteps: number;
    nextStep: () => void;
    prevStep: () => void;
    isSubmitting: boolean;
}

export default function BecomePartnerNavigationButtons({
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    isSubmitting,
}: Props) {
    const isLastStep = currentStep === totalSteps;

    return (
        <div className="px-6 py-4 border-t border-white/5 flex gap-3">
            {currentStep > 1 && (
                <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 h-11 px-4 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition-colors"
                >
                    Précédent
                </button>
            )}

            {!isLastStep && (
                <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 h-11 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
                >
                    Continuer
                </button>
            )}

            {isLastStep && (
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 h-11 px-4 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-medium transition-colors"
                >
                    {isSubmitting ? "Envoi..." : "Envoyer la demande"}
                </button>
            )}
        </div>
    );
}
