import { Menu } from "lucide-react";

interface Props {
    title: string;
    subtitle?: string;
    onMenuClick: () => void;
    actions?: React.ReactNode;
}

export default function DashboardHeader({ title, subtitle, onMenuClick, actions }: Props) {
    return (
        <header className="sticky top-0 z-20 border-b border-white/5 bg-[#0a0a0f]/90 backdrop-blur-xl">
            <div className="flex h-14 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-3">
                    {/* Menu mobile */}
                    <button
                        className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-white/5 md:hidden"
                        onClick={onMenuClick}
                    >
                        <Menu size={20} />
                    </button>

                    {/* Title */}
                    <div>
                        <h1 className="text-lg font-semibold text-white">{title}</h1>
                        {subtitle && (
                            <p className="text-xs text-slate-500">{subtitle}</p>
                        )}
                    </div>
                </div>

                {/* Actions (optionnel) */}
                <div className="flex items-center gap-3">
                    {/* Status badge */}
                    <div className="hidden sm:flex items-center gap-1. 5 px-3 py-1. 5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-medium text-emerald-400">En ligne</span>
                    </div>

                    {actions}
                </div>
            </div>
        </header>
    );
}