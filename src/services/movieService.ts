import axios from "axios";
import type { Movie } from "../types/movie";
interface FetchMoviesProps {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<FetchMoviesProps>(
    "https://api.themoviedb.org/3/search/movie",
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
      params: {
        query,
      },
    }
  );
  return response.data.results;
};
