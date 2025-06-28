const URL = import.meta.env.VITE_API_URL

const deleteUserMovieService = async (token: string, userMovieId: number) => {
    const url = `${URL}/user-movie/delete/${userMovieId}`
    const options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    console.log(url, options)
    return await fetch(url, options);
}

export default deleteUserMovieService;