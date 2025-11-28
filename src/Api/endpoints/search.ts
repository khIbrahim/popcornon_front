import axiosConfig from "../config";

interface SearchResults {
    movies: Array<{
        _id: string;
        title: string;
        poster: string;
        genres: string[];
        runtime: number;
        voteAverage: number;
    }>;
    cinemas: Array<{
        _id: string;
        name: string;
        city: string;
        wilaya: string;
    }>;
}

export async function searchAll(query: string): Promise<SearchResults> {
    const res = await axiosConfig.get<{ success: boolean; data: SearchResults }>(`/public/search?q=${encodeURIComponent(query)}`);
    return res. data. data;
}