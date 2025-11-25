import { Menu, ChevronDown } from "lucide-react";

interface Props {
    title: string;
    subtitle: string;
    onMenuClick: () => void;
}

export default function DashboardHeader({ title, subtitle, onMenuClick }: Props) {
    return (
        <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-2xl">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-3">
                    <button
                        className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-white/5 md:hidden"
                        onClick={onMenuClick}
                    >
                        <Menu size={18} />
                    </button>
                    <div>
                        <h1 className="text-lg font-semibold text-white">{title}</h1>
                        <p className="text-xs text-slate-500">{subtitle}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-medium text-emerald-400">En ligne</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-xs font-bold">
                            AD
                        </div>
                        <ChevronDown size={14} className="text-slate-500" />
                    </div>
                </div>
            </div>
        </header>
    );
}