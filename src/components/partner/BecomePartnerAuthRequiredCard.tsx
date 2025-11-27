interface AuthRequiredCardProps {
    onLogin: () => void;
}

export default function BecomePartnerAuthRequiredCard({ onLogin }: AuthRequiredCardProps) {
    return (
        <div className="text-center p-8 rounded-2xl bg-white/[0.02] border border-white/5">
            <p className="text-slate-300 mb-4">
                Connectez-vous pour soumettre votre demande.
            </p>
            <button
                onClick={onLogin}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl font-medium transition-colors"
            >
                Se connecter
            </button>
        </div>
    );
}