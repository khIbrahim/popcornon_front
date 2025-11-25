import {Film} from "lucide-react";
import classNames from "../../../utils/utils.ts";

interface Props {
    isOpen: boolean;
}

const CineDashboardSidebar = ({isOpen} : Props) => {
    return (
        <aside
            className={classNames(
                "fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-800 bg-slate-950/95 backdrop-blur-xl shadow-xl transition-transform duration-300 md:static md:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}
        >
            <div className="flex h-16 items-center gap-2 border-b border-slate-800 px-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-white shadow-lg shadow-red-600/40">
                    <Film size={20} />
                </div>
                <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">
              Ciné<span className="text-red-500">Dz</span> Admin
            </span>
                    <span className="text-[11px] text-slate-400">
              Cinéma • Alger Centre
            </span>
                </div>
            </div>

            <nav className="mt-4 space-y-1 px-3">
                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800/80">
                    <span className="h-1 w-1 rounded-full bg-slate-500" />
                    Vue générale
                </button>
                <button className="flex w-full items-center gap-2 rounded-lg bg-red-600/10 px-3 py-2 text-sm font-semibold text-red-400 ring-1 ring-red-600/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(248,113,113,0.9)]" />
                    Films du cinéma
                </button>
                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800/80">
                    <span className="h-1 w-1 rounded-full bg-slate-500" />
                    Séances & horaires
                </button>
                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800/80">
                    <span className="h-1 w-1 rounded-full bg-slate-500" />
                    Paramètres
                </button>
            </nav>

            <div className="mt-auto border-t border-slate-800 p-4 text-xs text-slate-500">
                <p>Connecté en tant que</p>
                <p className="font-medium text-slate-300">admin@cinema-dz.dz</p>
            </div>
        </aside>
    );
}

export default CineDashboardSidebar;