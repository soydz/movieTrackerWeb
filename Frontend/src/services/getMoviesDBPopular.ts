const KEY = import.meta.env.VITE_THE_MOVIE_DB_KEY;

const getMoviesDBPopular = async () => {
    const url = "https://api.themoviedb.org/3/movie/popular?&language=es-ES&page=1"

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${KEY}`
        }
    }

    return await fetch(url, options);
}

export default getMoviesDBPopular;