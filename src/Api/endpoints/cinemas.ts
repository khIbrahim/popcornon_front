import axiosConfig from "../config";
import type {Cinema, CinemaScreening} from "../../types/cinema";
import type {WeekHours} from "../../types/openingHours.ts";
import type {CinemaHall} from "../../types/halls.ts";

interface CinemasResponse {
    success: boolean;
    count: number;
    data: Cinema[];
}

interface CinemaResponse {
    success: boolean;
    data: Cinema;
}

interface ScreeningsResponse {
    success: boolean;
    count: number;
    data: CinemaScreening[];
}

export async function getCinemas(filters?: { wilaya?: string; city?: string }): Promise<CinemasResponse> {
    const params = new URLSearchParams();
    if (filters?.wilaya) params.append("wilaya", filters. wilaya);
    if (filters?.city) params.append("city", filters.city);

    const res = await axiosConfig.get<CinemasResponse>(`/cinemas?${params.toString()}`);
    return res.data;
}

export async function getCinemaById(id: string): Promise<CinemaResponse> {
    const res = await axiosConfig.get<CinemaResponse>(`/cinemas/${id}`);
    return res.data;
}

export async function getCinemaScreenings(
    cinemaId: string,
    date?: string
): Promise<ScreeningsResponse> {
    const url = date
        ? `/cinemas/${cinemaId}/screenings?date=${date}`
        : `/cinemas/${cinemaId}/screenings`;
    const res = await axiosConfig.get<ScreeningsResponse>(url);
    return res.data;
}

export async function searchCinemas(term: string): Promise<CinemasResponse> {
    const res = await axiosConfig.get<CinemasResponse>(`/cinemas/search?q=${encodeURIComponent(term)}`);
    return res.data;
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