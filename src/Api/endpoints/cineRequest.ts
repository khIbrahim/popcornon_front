import axiosConfig from "../config.ts";
import type {CineRequestI, CineRequestStatus, CineStatusResponse} from "../../types/cineRequest.ts";
import type {Cinema} from "../../types/cinema.ts";

export async function getCineStatus(): Promise<CineStatusResponse> {
    const res = await axiosConfig.get<CineStatusResponse>("api/cine-request/me");
    return res.data;
}

// export async function createCineRequest(payload: CineRequestI): Promise<{
//     success: boolean;
//     status: string;
//     message: string;
//     errors: any[];
//     data: null;
// }>
// {
//     try {
//         const res = await axiosConfig.post<CineStatusResponse>("api/cine-requests", payload);
//
//         return res.data;
//     } catch (error: any) {
//         if (error.response) {
//             const backend = error.response.data;
//
//             return {
//                 success: false,
//                 status: "none",
//                 message: backend.message || "Validation failed",
//                 errors: backend.errors || [],
//                 data: null
//             };
//         }
//
//         return {
//             success: false,
//             status: "none",
//             message: "Erreur de connexion au serveur",
//             errors: [],
//             data: null
//         };
//     }
// }

export async function createCineRequest(payload: CineRequestI): Promise<CineRequestI>
{
    const res = await axiosConfig.post<{
        message: string;
        data:    CineRequestI;
    }>("cine-requests", payload);

    return res.data.data;
}

export async function getAllCineRequests(status?: CineRequestStatus): Promise<CineRequestI[]> {
    const response = await axiosConfig.get<{ data: CineRequestI[] }>("/cine-requests",
        {
            params: status ? { status } : undefined,
        }
    );

    return response.data.data;
}

export async function approveRequest(cineRequestId: number): Promise<Cinema> {
    const res = await axiosConfig.post<{
        data: Cinema;
    }>(`/cine-requests/${cineRequestId}/approve`);

    return res.data.data;
}

export async function reviewCineRequest(id: number, status: "approved" | "rejected", adminNote?: string): Promise<CineStatusResponse> {
    const res = await axiosConfig.patch<CineStatusResponse>(`/cine-request/${id}/review`, {
        status,
        adminNote
    });
    return res.data;
}