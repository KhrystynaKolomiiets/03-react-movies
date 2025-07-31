import { useEffect } from "react";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";
interface MovieModalProps {
  movies: Movie;
  onClose: () => void;
}
export default function MovieModal({
  movies: { title, overview, release_date, vote_average, backdrop_path },
  onClose,
}: MovieModalProps) {
  const backdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);
  return (
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={backdropClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          alt={title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{title}</h2>
          <p>{overview}</p>
          <p>
            <strong>Release Date:</strong> {release_date}
          </p>
          <p>
            <strong>Rating:</strong> {vote_average}
          </p>
        </div>
      </div>
    </div>
  );
}
