import axiosConfig from "../config";
import type {
    PublicCinemaScreening,
    PublicCinemasListResponse,
    PublicCinemaDetailResponse,
} from "../../types/publicCinema";

export async function getPublicCinemas(params?: {
    wilaya?: string;
    city?: string;
    q?: string;
    page?: number;
    limit?: number;
}): Promise<PublicCinemasListResponse> {
    const searchParams = new URLSearchParams();

    if (params?.wilaya) {
        searchParams.append("wilaya", params.wilaya);
    }
    if (params?.city) {
        searchParams.append("city", params.city);
    }
    if (params?.q) {
        searchParams.append("q", params.q);
    }
    if (params?.page) {
        searchParams.append("page", String(params.page));
    }
    if (params?.limit) {
        searchParams.append("limit", String(params.limit));
    }

    const query = searchParams.toString();
    const url   = query ? `/public-cinemas?${query}` : `/public-cinemas`;

    const res = await axiosConfig.get<PublicCinemasListResponse>(url);
    return res.data;
}

export async function getPublicCinemaById(
    id: string
): Promise<PublicCinemaDetailResponse> {
    const res = await axiosConfig.get<PublicCinemaDetailResponse>(`/public-cinemas/${id}`);
    return res.data;
}

export async function getPublicCinemaByName(
    name: string
): Promise<PublicCinemaDetailResponse> {
    const res = await axiosConfig.get<PublicCinemaDetailResponse>(
        `/public-cinemas/cinema/${encodeURIComponent(name)}`
    );
    return res.data;
}

export async function searchPublicCinemas(term: string): Promise<PublicCinemasListResponse> {
    const res = await axiosConfig.get<PublicCinemasListResponse>(
        `/public-cinemas/search?q=${encodeURIComponent(term)}`
    );
    return res.data;
}

// Optionnel si tu veux juste les séances d’un cinéma sans repasser par le détail
export interface PublicCinemaScreeningsResponse {
    success: boolean;
    count: number;
    data: PublicCinemaScreening[];
}
