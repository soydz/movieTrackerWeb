const URL = import.meta.env.VITE_THE_MOVIE_DB_URL;
const KEY = import.meta.env.VITE_THE_MOVIE_DB_KEY;

const getMoviesDB = async (movie) => {
    const url = `${URL}${movie}`

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${KEY}`
        }
    }

    return await fetch(url, options);
}

export default getMoviesDB;