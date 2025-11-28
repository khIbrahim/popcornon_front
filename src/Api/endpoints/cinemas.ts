import axiosConfig from "../config";
import type {Cinema} from "../../types/cinema";
import type {WeekHours} from "../../types/openingHours.ts";
import type {CinemaHall} from "../../types/halls.ts";

interface CinemaResponse {
    success: boolean;
    data: Cinema;
}

export async function getCinemaHalls(): Promise<{ success: boolean; data: CinemaHall[] }> {
    const res = await axiosConfig.get<{ success: boolean; data: CinemaHall[] }>(`/cinema/halls`);

    return res.data;
}

export async function updateCinemaHalls(
    halls: CinemaHall[]
): Promise<{ success: boolean; data: CinemaHall[] }> {
    try {
        console.log("données envoyées : ", {halls});
        const res = await axiosConfig.put<{ success: boolean; data: CinemaHall[] }>(
            `/cinema/halls`,
            { halls: halls }
        );

        return res.data;
    } catch(error: any){
        console.error("erreur update des salles:", error.response?.data || error.message);
        throw error;
    }
}

export async function myCinema(): Promise<CinemaResponse> {
    const res = await axiosConfig.get<CinemaResponse>(`/cinema/me`);
    return res.data;
}

export async function updateCinema(
    updateData: Partial<Omit<Cinema, "_id" | "screens" | "owner">>
): Promise<CinemaResponse> {
    const res = await axiosConfig.patch<CinemaResponse>(`cinema/`, updateData);

    return res.data;
}

export async function getCinemaOpeningHours(): Promise<{ success: boolean; data: WeekHours }> {
    const res = await axiosConfig.get<{ success: boolean; data: WeekHours }>(`/cinema/opening-hours`);
    return res.data;
}

export async function updateCinemaOpeningHours(
    hours: WeekHours
): Promise<{ success: boolean; data: WeekHours }> {
    const res = await axiosConfig.put<{ success: boolean; data: WeekHours }>(
        `/cinema/opening-hours`, { hours }
    );

    return res.data;
}

export async function updateCinemaStatus(status: "active" | "suspended"): Promise<{ success: boolean }> {
    const res = await axiosConfig.patch("/cinema/status", { status });
    return res.data;
}

export async function deleteCinema(): Promise<{ success: boolean }> {
    const res = await axiosConfig.delete("/cinema");
    return res. data;
}