import axiosConfig from "../config";
import type {Cinema} from "../../types/cinema";
import type {WeekHours} from "../../types/openingHours.ts";
import type {CinemaHall} from "../../types/halls.ts";

interface CinemaResponse {
    success: boolean;
    data: Cinema;
}

export async function getCinemaHalls(): Promise<{ success: boolean; data: CinemaHall[] }> {
    const res = await axiosConfig.get<{ success: boolean; data: CinemaHall[] }>(`/cinema-halls`);

    return res.data;
}

export async function createCinemaHall(
    hall: Omit<CinemaHall, "id">
): Promise<{ success: boolean; data: CinemaHall }> {

    const res = await axiosConfig.post<{ success: boolean; data: CinemaHall }>(
        "/cinema-halls",
        hall
    );

    return res.data;
}

export async function updateCinemaHall(
    hall: CinemaHall
): Promise<{ success: boolean; data: CinemaHall }> {

    const res = await axiosConfig.put<{ success: boolean; data: CinemaHall }>(
        `/cinema-halls/${hall.id}`,
        hall
    );

    return res.data;
}

export async function deleteCinemaHall(
    id: number
): Promise<{ success: boolean }> {

    const res = await axiosConfig.delete<{ success: boolean }>(
        `/cinema-halls/${id}`
    );

    return res.data;
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
        `/cinema/opening-hours`,
        hours
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

export async function updateCinemaLocation(
    latitude: number,
    longitude: number
): Promise<{ success: boolean; message: string }> {
    const res = await axiosConfig.put(
        "/cinema/location",
        {
            latitude,
            longitude,
        }
    );

    return res.data;
}