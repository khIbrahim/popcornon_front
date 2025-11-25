import {Facebook, Instagram, Twitter} from "lucide-react";
import {Film} from "lucide-react";

const Footer = () => (
    <footer id="about" className="bg-slate-950 border-t border-slate-800 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center mb-4">
                        <Film className="h-8 w-8 text-red-500" />
                        <span className="ml-2 text-xl font-bold text-white">Ciné<span className="text-red-500">Dz</span></span>
                    </div>
                    <p className="text-gray-400 text-sm">
                        La première plateforme de réservation de cinéma en Algérie. Vivez le cinéma autrement.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4">Navigation</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li><a href="#" className="hover:text-red-500">Accueil</a></li>
                        <li><a href="#films" className="hover:text-red-500">Films</a></li>
                        <li><a href="#cinemas" className="hover:text-red-500">Cinémas</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4">Légal</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li><a href="#" className="hover:text-white">Conditions d'utilisation</a></li>
                        <li><a href="#" className="hover:text-white">Politique de confidentialité</a></li>
                        <li><a href="#" className="hover:text-white">Contact Support</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4">Suivez-nous</h4>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-red-500 transition-colors"><Facebook size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-red-500 transition-colors"><Instagram size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-red-500 transition-colors"><Twitter size={20} /></a>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-800 pt-8 text-center">
                <p className="text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} CinéDz Algérie. Tous droits réservés.
                </p>
            </div>
        </div>
    </footer>
);

export default Footer;