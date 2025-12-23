import { Link } from "react-router-dom";

const TermsPage = () => {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Conditions d'utilisation</h1>
                <div className="prose prose-invert max-w-none">
                    <p className="text-lg mb-6">
                        Bienvenue sur PopcornON, la première plateforme de réservation de
                        cinéma en Algérie.
                    </p>
                    <p>
                        Ces conditions d'utilisation régissent votre utilisation de notre
                        plateforme. En utilisant PopcornON, vous acceptez ces conditions.
                    </p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">
                        1. Utilisation du service
                    </h2>
                    <p>
                        PopcornON vous permet de réserver des places de cinéma en ligne.
                        Vous devez être âgé de 18 ans ou plus pour utiliser ce service.
                    </p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">
                        2. Responsabilités
                    </h2>
                    <p>
                        Vous êtes responsable de la véracité des informations fournies lors
                        de l'inscription et de la réservation.
                    </p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">
                        3. Politique d'annulation
                    </h2>
                    <p>
                        Les annulations sont possibles jusqu'à 2 heures avant la séance. Des
                        frais peuvent s'appliquer.
                    </p>
                    <div className="mt-12">
                        <Link to="/" className="text-primary hover:underline">
                            ← Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
