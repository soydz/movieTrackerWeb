import type { Movie} from "../interfaces/movie";

const normalizeMovie = (movie: Movie) => {
    return {
        id: movie.id,
        posterPath: movie.poster_path || movie.posterPath,
        overview: movie.overview,
        releaseDate: movie.release_date || movie.releaseDate,
        genres: movie.genre_ids || movie.genres,
        title: movie.title,
        originalTitle: movie.original_title || movie.originalTitle,
        originalLanguage: movie.original_language || movie.originalLanguage,
        runtime: movie.runtime,
        view: movie.view
    }
}

export default normalizeMovie;