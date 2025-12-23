import { Link } from "react-router-dom";

const PrivacyPage = () => {
    return (
        <div className="min-h-screen bg-background text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">
                    Politique de confidentialité
                </h1>
                <div className="prose prose-invert max-w-none">
                    <p className="text-lg mb-6">
                        Chez PopcornON, la protection de vos données personnelles est notre
                        priorité.
                    </p>
                    <p>
                        Cette politique de confidentialité explique comment nous collectons,
                        utilisons et protégeons vos informations personnelles.
                    </p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">
                        1. Collecte des données
                    </h2>
                    <p>
                        Nous collectons les informations que vous nous fournissez lors de
                        l'inscription et de la réservation, telles que votre nom, email,
                        numéro de téléphone et préférences.
                    </p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">
                        2. Utilisation des données
                    </h2>
                    <p>
                        Vos données sont utilisées pour traiter vos réservations, améliorer
                        notre service et vous envoyer des informations pertinentes sur les
                        films et cinémas.
                    </p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">
                        3. Protection des données
                    </h2>
                    <p>
                        Nous mettons en place des mesures de sécurité appropriées pour
                        protéger vos données contre tout accès non autorisé ou divulgation.
                    </p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">4. Vos droits</h2>
                    <p>
                        Vous avez le droit d'accéder, rectifier ou supprimer vos données
                        personnelles. Contactez-nous pour exercer ces droits.
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

export default PrivacyPage;
