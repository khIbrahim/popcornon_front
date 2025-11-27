import {Box, Crown, Tv} from "lucide-react";

export const HALL_TYPES = [
    { value: "standard", label: "Standard", icon: Tv },
    { value: "vip", label: "VIP", icon: Crown },
    { value: "imax", label: "IMAX", icon: Box },
    { value: "3d", label: "3D", icon: Box },
];

export interface CinemaHall {
    name: string;
    capacity: number;
    type: "standard" | "vip" | "imax" | "3d";
}