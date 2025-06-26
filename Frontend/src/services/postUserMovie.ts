const URL = `${import.meta.env.VITE_API_URL}/user-movie/save`

const postUserMovie = async (userMovieData , token: string) => {

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userMovieData)
    }

    return await fetch(URL, options);
}

export default postUserMovie;