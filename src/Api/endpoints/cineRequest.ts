import axiosConfig from "../config.ts";
import type {CineRequestI, CineStatusResponse} from "../../types/cineRequest.ts";

export async function getCineStatus(): Promise<CineStatusResponse> {
    const res = await axiosConfig.get<CineStatusResponse>("/cine-request/me");
    return res.data;
}

export async function createCineRequest({
    cinemaName,
    address,
    phone,
    email,
    motivation
}: CineRequestI): Promise<CineStatusResponse> {
    try {
        const res = await axiosConfig.post<CineStatusResponse>("/cine-request", {
            cinemaName,
            address,
            phone,
            email,
            motivation
        });

        return res.data;
    } catch (error: any) {
        if (error.response) {
            return {
                success: false,
                status: "none",
                data: error.response.data || null,
            };
        }

        return {
            success: false,
            status: "none",
            data: null,
        };
    }

}

export async function getAllCineRequests(status?: string): Promise<CineStatusResponse & { data: CineRequestI[] }> {
    const url = status ? `/cine-request?status=${status}` : "/cine-request";
    const res = await axiosConfig.get<CineStatusResponse & { data: CineRequestI[] }>(url);
    return res.data;
}

export async function reviewCineRequest(id: string, status: "approved" | "rejected", adminNote?: string): Promise<CineStatusResponse> {
    const res = await axiosConfig.patch<CineStatusResponse>(`/cine-request/${id}/review`, {
        status,
        adminNote
    });
    return res.data;
}