export interface Movie {
    id: number,
    posterPath: string,
    poster_path?: string,
    overview: string,
    releaseDate: string,
    release_date?: string,
    genres?: Array<number>,
    genreIds?: Array<number>,
    genre_ids?: Array<number>,
    title: string,
    originalTitle: string,
    original_title?: string,
    originalLanguage: string,
    original_language?: string,
    runtime: number,
    view: boolean
}

export interface PopularMovies {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface PopularMoviesRes {
    results: Array<PopularMovies>
}

export interface MovieDTO {
    id: number,
    genres?: Array<string>,
    originalLanguage: string,
    originalTitle: string,
    title: string,
    overview: string,
    posterPath: string,
    releaseDate: string
    runtime: number,
    view: boolean,
}

export interface UserMovieDTO {
    id: number,
    rating: number,
    addedDate: string,
    movieDTO: MovieDTO
}

export interface DataMovieUSer {
    username: string,
    userMovieDTOList: Array<UserMovieDTO>
}

export interface SeeMovie {
    id: number,
    addedDate: string,
    rating: number,
    movieDTO: MovieDTO
}

export interface UserMovieData {
  username: string,
  movie: MovieDTO,
  rating: number;
}
