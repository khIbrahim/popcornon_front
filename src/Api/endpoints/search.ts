import { getCinemas } from "./cinemas";
import { getPublicMovies } from "./movies.public";

interface SearchResults {
    movies: Array<{
        tmdb_id: number;
        title:   string;
        poster:  string | null;
        genres:  string[];
        runtime: number | null;
    }>;

    cinemas: Array<{
        id:     number;
        name:   string;
        city:   string;
        wilaya: string;
    }>;
}

export async function searchAll(query: string): Promise<SearchResults> {
    const normalizedQuery = query.trim();
    const searchTerm = normalizedQuery.toLocaleLowerCase("fr-FR");

    const [cinemasResponse, moviesResponse] = await Promise.all([
        getCinemas({
            q: normalizedQuery,
            perPage: 5,
        }),
        getPublicMovies(),
    ]);

    return {
        cinemas: cinemasResponse.data.slice(0, 5).map((cinema) => ({
            id: cinema.id,
            name: cinema.name,
            city: cinema.city,
            wilaya: cinema.wilaya,
        })),

        movies: moviesResponse.data
            .filter((movie) =>
                movie.title.toLocaleLowerCase("fr-FR").includes(searchTerm)
            )
            .slice(0, 5)
            .map((movie) => ({
                tmdb_id: movie.tmdb_id,
                title: movie.title,
                poster: movie.poster,
                genres: movie.genres,
                runtime: movie.runtime,
            })),
    };
}