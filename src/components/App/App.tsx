import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import { type Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSelectedMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    openModal();
  };
  const handleSubmit = async (movieName: string) => {
    try {
      setMovies([]);
      setIsError(false);
      setIsLoading(true);
      const newMovies = await fetchMovies(movieName);
      if (newMovies.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }
      setMovies(newMovies);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={css.app}>
      <Toaster />
      <SearchBar onSubmit={handleSubmit} />
      {isError ? (
        <ErrorMessage />
      ) : (
        <MovieGrid onSelect={handleSelectedMovie} movies={movies} />
      )}
      {isLoading && <Loader />}
      {isModalOpen && selectedMovie && (
        <MovieModal movies={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}
