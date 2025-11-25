import {MapPin, Search} from "lucide-react";

const HeroSection = () => {
    return (
        <div className="relative bg-slate-900 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-slate-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 min-h-[600px] flex flex-col justify-center px-4 sm:px-6 lg:px-8">

                    <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
                        <div className="sm:text-center lg:text-left">
                            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">Votre cinéma,</span>{' '}
                                <span className="block text-red-600 xl:inline">où que vous soyez en Algérie.</span>
                            </h1>
                            <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                Découvrez les cinémas les plus proches, consultez les séances en temps réel et réservez votre fauteuil en quelques clics.
                            </p>

                            {/* Barre de recherche rapide */}
                            <div className="mt-8 flex gap-2 max-w-md lg:mx-0 sm:mx-auto">
                                <div className="relative flex-grow">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-l-md leading-5 bg-slate-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-slate-700 focus:ring-2 focus:ring-red-500 sm:text-sm"
                                        placeholder="Chercher un film, un cinéma..."
                                    />
                                </div>
                                <button className="px-6 py-3 border border-transparent text-base font-medium rounded-r-md text-white bg-red-600 hover:bg-red-700 focus:outline-none transition-colors">
                                    Rechercher
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* Section MAP / GPS Integration */}
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-slate-800 border-l border-slate-700 relative h-96 lg:h-full">
                {/* Placeholder pour Google Maps API */}
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 relative group cursor-pointer">

                    {/* Simulation de la carte (Background image placeholder) */}
                    <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1748&q=80')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-500"></div>

                    <div className="z-10 bg-slate-900/90 p-6 rounded-xl border border-slate-600 backdrop-blur-sm text-center transform transition-transform group-hover:scale-105">
                        <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                            <MapPin size={32} className="animate-bounce" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Localisation Active</h3>
                        <p className="text-gray-400 text-sm mb-4">Intégration Google Maps API ici.</p>
                        <div className="text-xs text-green-400 font-mono bg-green-400/10 px-2 py-1 rounded inline-block">
                            GPS: 36.7525° N, 3.0420° E (Alger)
                        </div>
                        <div className="mt-4 text-sm text-gray-300">
                            3 Cinémas trouvés à proximité
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HeroSection;