import classNames from "../../../utils/utils";
import {formatDateLocal} from "../../../utils/date.ts";

interface Props {
    days: Date[];
    selectedDate: string;
    onSelect: (date: string) => void;
}

const DAYS_SHORT = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

export default function DaySelector({ days, selectedDate, onSelect }: Props) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
        <div className="flex items-center gap-2 p-1. 5 rounded-2xl bg-white/[0. 02] border border-white/5 overflow-x-auto">
            {days.map((day) => {
                const dateStr = formatDateLocal(day);
                const isSelected = selectedDate === dateStr;
                const isToday = day.getTime() === today.getTime();
                const dayName = isToday ? "Auj" : DAYS_SHORT[day.getDay()];

                return (
                    <button
                        key={dateStr}
                        onClick={() => onSelect(dateStr)}
                        className={classNames(
                            "flex flex-col items-center min-w-[60px] px-3 py-2. 5 rounded-xl transition-all",
                            isSelected
                                ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <span className="text-[10px] font-semibold uppercase tracking-wide">
                            {dayName}
                        </span>
                        <span className="text-lg font-bold mt-0.5">
                            {day.getDate()}
                        </span>
                        {isToday && ! isSelected && (
                            <span className="w-1 h-1 rounded-full bg-red-500 mt-1" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}