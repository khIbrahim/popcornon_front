import type {Movie} from "../../types/movie.ts";
import axiosConfig from "../config.ts";

export async function getMovies(
    cinemaId: string,
    status: string | null | undefined
): Promise<
    Movie & { success: boolean;
    count: Number;
    data: Movie[]
}> {
    const url = status ? `/movies/${cinemaId}/movies?status=${status}` : `/cinemas/${cinemaId}/movies`;
    const res = await axiosConfig.get<Movie & { success: boolean; count: Number; data: Movie[] }>(url);

    return res.data;
}

export async function getMyMovies(params?: {
    date?: string;
    status?: string;
}): Promise<{ success: boolean; data: Movie[] }> {
    const query = new URLSearchParams();
    if (params?.date) {
        query.append("date", params.date);
    }
    if (params?.status) {
        query.append("status", params.status);
    }

    const res = await axiosConfig.get(`/movies?${query}`);
    return res.data;
}

// @ts-ignore
export async function createMovie(data: Partial<Movie>): Promise<Movie & { success: boolean; data: Movie }> {
    try {
        const res = await axiosConfig.post<Movie & { success: boolean; data: Movie }>(`/movies`, data);

        console.log(res);

        return res.data;
    } catch (error: any) {
        if (error.response) {
            console.log({
                success: false,
                message: error.response.data?.message || "Unknown server error",
                errors: error.response.data?.errors || null,
            });
        }

        console.log({
            success: false,
            message: "Une erreur réseau est survenue. Veuillez réessayer.",
            errors: null,
        });
    }
}

export async function updateMovie(
    id: string,
    data: Partial<Movie>
): Promise<Movie & { success: boolean; data: Movie }> {
    const res = await axiosConfig.patch<Movie & { success: boolean; data: Movie }>(`/movies/${id}`, data);

    return res.data;
}

export async function deleteMovie(
    id: string
): Promise<{ success: boolean; message: string }> {
    const res = await axiosConfig.delete<{ success: boolean; message: string }>(`/movies/${id}`);

    return res.data;
}

export async function archiveExpiredMovies(): Promise<{ success: boolean; archived: number }> {
    const res = await axiosConfig.post("/movies/archive-expired");
    return res.data;
}