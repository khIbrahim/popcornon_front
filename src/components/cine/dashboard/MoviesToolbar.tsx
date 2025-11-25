import { Search, Plus, ChevronDown } from "lucide-react";
import Button from "../ui/Button.tsx";
import type { MovieStatus } from "../../../types/movie.ts";

interface Props {
    search: string;
    onSearchChange: (value: string) => void;
    statusFilter: "all" | MovieStatus;
    onStatusChange: (value: "all" | MovieStatus) => void;
    onAddClick: () => void;
}

const STATUS_OPTIONS = [
    { value: "all", label: "Tous les films" },
    { value: "active", label: "Actifs" },
    { value: "draft", label: "Brouillons" },
    { value: "archived", label: "Archivés" },
];

export default function MoviesToolbar({ search, onSearchChange, statusFilter, onStatusChange, onAddClick }: Props) {
    return (
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
                {/* Search Input */}
                <div className="relative flex-1 sm:max-w-xs">
                    <Search className="absolute left-3. 5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Rechercher un film..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full h-11 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-red-500/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-red-500/20"
                    />
                </div>

                {/* Status Select */}
                <div className="relative">
                    <select
                        value={statusFilter}
                        onChange={(e) => onStatusChange(e.target.value as "all" | MovieStatus)}
                        className="appearance-none h-11 pl-4 pr-10 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium outline-none transition-all duration-200 cursor-pointer hover:bg-white/[0.07] focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                    >
                        {STATUS_OPTIONS. map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                </div>
            </div>

            {/* Add Button */}
            <Button onClick={onAddClick} className="w-full sm:w-auto h-11 cursor-pointer">
                <Plus size={18} />
                Ajouter un film
            </Button>
        </div>
    );
}