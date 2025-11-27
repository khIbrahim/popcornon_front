import type {BasicUserI} from "./user.ts";

export type CineStatus = "none" | "pending" | "approved" | "rejected" | "cinema";

export interface CineStatusResponse {
    success: boolean;
    status: CineStatus;
    data: any;
    message: string;
    errors: any[];
}

export interface CineRequestI {
    cinemaName: string;
    address: string;
    phone: string;
    email: string;
    motivation: string;
    user: BasicUserI;
}