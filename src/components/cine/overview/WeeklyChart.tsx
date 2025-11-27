import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { BarChart3 } from "lucide-react";

interface ChartData {
    day: string;
    seances: number;
    revenus: number;
}

interface Props {
    data: ChartData[];
    isLoading?: boolean;
}

export default function WeeklyChart({ data, isLoading }: Props) {
    if (isLoading) {
        return (
            <div className="rounded-2xl bg-white/[0. 02] border border-white/5 p-6 h-[350px] animate-pulse">
                <div className="h-6 w-48 bg-white/5 rounded mb-6" />
                <div className="h-full bg-white/5 rounded" />
            </div>
        );
    }

    return (
        <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <BarChart3 size={20} className="text-blue-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">Activité de la semaine</h3>
                        <p className="text-xs text-slate-500">Séances programmées</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1. 5">
                        <span className="w-3 h-3 rounded-sm bg-red-500" />
                        <span className="text-slate-400">Séances</span>
                    </div>
                </div>
            </div>

            <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#64748b", fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#64748b", fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#0f172a",
                                border: "1px solid #1e293b",
                                borderRadius: "12px",
                                boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                            }}
                            labelStyle={{ color: "#fff", fontWeight: 600 }}
                            itemStyle={{ color: "#94a3b8" }}
                            cursor={{ fill: "rgba(239, 68, 68, 0. 1)" }}
                        />
                        <Bar
                            dataKey="seances"
                            fill="#ef4444"
                            radius={[6, 6, 0, 0]}
                            name="Séances"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}