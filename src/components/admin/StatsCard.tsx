import type {LucideIcon} from "lucide-react";
import {cn} from "../../utils/cn.ts";

interface StatsCardProps {
    title: string;
    value: number | string;
    icon: LucideIcon;
    trend?: string;
    variant?: "default" | "primary" | "success" | "warning";
    isLoading?: boolean;
}

export default function StatsCard({
    title,
    value,
    icon: Icon,
    trend,
    variant = "default",
    isLoading
}: StatsCardProps) {
    const iconColors = {
        default: "text-muted-foreground bg-muted",
        primary: "text-primary bg-primary/20",
        success: "text-emerald-400 bg-emerald-500/20",
        warning: "text-amber-400 bg-amber-500/20",
    };

    return (
        <div className="p-5 rounded-xl bg-card border border-border animate-fade-in">
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{title}</p>
                    {isLoading ? (
                        <div className="h-8 w-16 bg-muted rounded animate-pulse-soft" />
                    ) : (
                        <p className="text-2xl font-bold text-foreground">{value}</p>
                    )}
                    {trend && (
                        <p className="text-xs text-muted-foreground">{trend}</p>
                    )}
                </div>
                <div className={cn("p-3 rounded-lg", iconColors[variant])}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
}