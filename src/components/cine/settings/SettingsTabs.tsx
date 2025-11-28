import { Building2, Clock, LayoutGrid, AlertTriangle, MapPin } from "lucide-react";
import classNames from "../../../utils/utils";

type Tab = "general" | "halls" | "hours" | "location" | "danger";

interface Props {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

const TABS = [
    { id: "general" as Tab, label: "Infos", icon: Building2 },
    { id: "halls" as Tab, label: "Salles", icon: LayoutGrid },
    { id: "hours" as Tab, label: "Horaires", icon: Clock },
    { id: "location" as Tab, label: "Position", icon: MapPin },
    { id: "danger" as Tab, label: "Danger", icon: AlertTriangle },
];

export default function SettingsTabs({ activeTab, onTabChange }: Props) {
    return (
        <div className="flex gap-1. 5 p-1.5 rounded-2xl bg-white/[0.02] border border-white/5 overflow-x-auto">
            {TABS.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab. id)}
                    className={classNames(
                        "flex items-center gap-2 px-4 py-2. 5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer",
                        activeTab === tab.id
                            ? "bg-red-500/10 text-red-400"
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )}
                >
                    <tab.icon size={16} />
                    <span className="hidden sm:inline">{tab.label}</span>
                </button>
            ))}
        </div>
    );
}