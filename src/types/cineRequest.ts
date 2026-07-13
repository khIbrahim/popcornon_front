import type {BasicUserI} from "./user.ts";

export type CineStatus = "none" | "pending" | "approved" | "rejected" | "cinema";

export type CineRequestStatus = "pending" | "approved" | "rejected";

export interface CineStatusResponse {
    success: boolean;
    status: CineStatus;
    data: any;
    message: string;
    errors: any[];
}

export interface CineRequestI {
    id:         number;
    cinemaName: string;
    address:    string;
    phone:      string;
    email:      string;
    motivation: string;
    user:       BasicUserI;
    status:     CineRequestStatus;
    createdAt:  string;
    halls?:     { name: string; capacity: number; type: string }[];
}