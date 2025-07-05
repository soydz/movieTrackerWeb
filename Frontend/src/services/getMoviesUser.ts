const URL = import.meta.env.VITE_API_URL;

const getMoviesUser = async (username:string, token: string) => {
    const url = `${URL}/user-movie/find/${username}`

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    return await fetch(url, options);
}

export default getMoviesUser;