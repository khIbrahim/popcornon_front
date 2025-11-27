import { Clock, CheckCircle, XCircle } from "lucide-react";

export type HallType = "standard" | "vip" | "imax" | "3d";

export interface User {
    firstName: string;
    lastName: string;
    role: "user" | "admin" | "cine";
}

export interface HallForm {
    name: string;
    capacity: number;
    type: HallType;
}

export interface FormState {
    cinemaName: string;
    description: string;
    address: string;
    city: string;
    wilaya: string;
    phone: string;
    email: string;
    website: string;
    capacity: number;
    motivation: string;
}

export const statusConfig = {
    pending: {
        icon: Clock,
        label: "En attente",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/30"
    },
    approved: {
        icon: CheckCircle,
        label: "Approuvée",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30"
    },
    rejected: {
        icon: XCircle,
        label: "Refusée",
        color: "text-rose-400",
        bg: "bg-rose-500/10",
        border: "border-rose-500/30"
    }
} as const;