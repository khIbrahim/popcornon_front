import { Calendar } from "lucide-react";

interface MoviesPageHeaderProps {
    dateLabel: string;
    movieCount: number;
}

export default function MoviesPageHeader({
    dateLabel,
    movieCount,
}: MoviesPageHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl sm:text-4xl font-bold">
                    Films <span className="text-red-500">à l'affiche</span>
                </h1>
                <p className="text-slate-400 mt-1 flex items-center gap-2">
                    <Calendar size={16} />
                    {dateLabel} • {movieCount} séance(s)
                </p>
            </div>
        </div>
    );
}
