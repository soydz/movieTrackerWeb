export interface Movie {
    id: number,
    posterPath: string,
    poster_path?: string,
    overview: string,
    releaseDate: string,
    release_date?: string,
    genres: Array<number>,
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

export interface MovieDTO {
    id: number,
    genreSet: Array<string>,
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

export interface SeeMovie {
    username: string,
    userMovieDTOList: UserMovieDTO,
}