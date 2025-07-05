import { Box, Button, Card, Dialog, Flex, Inset, Text } from "@radix-ui/themes";
import postUserMovie from "../services/postUserMovie";
import normalizeMovie from "../util/normalizeMovie";
import deleteUserMovieService from "../services/deleteUserMovieService";
import { CardMovieFull } from "./CardMovieFull";
import { useEffect, useState } from "react";
import type { Movie, SeeMovie, UserMovieData } from "../interfaces/movie";
import type { User } from "../interfaces/user";

const URL_IMG = import.meta.env.VITE_THE_MOVIE_DB_URL_IMG;
const URL_IMG_NOT_FOUND = import.meta.env.VITE_IMG_NOT_FOUND_URL

interface CardMovieProps {
    movie: Movie,
    user: User | null,
    seeMovies: Array<SeeMovie>,
    setSeeMovies: React.Dispatch<React.SetStateAction<Array<SeeMovie>>>
}

export const CardMovie = ({ movie, user, seeMovies, setSeeMovies }: CardMovieProps) => {

    const [isView, setIsView] = useState(false);

    useEffect(() => {
        const seen = seeMovies.some(item => item.movieDTO.id === movie.id);
        setIsView(seen);
    }, [seeMovies, movie.id]);
    

    const normalizedMovie = normalizeMovie(movie)

    const fectchUserMovie = async (userMovieData: UserMovieData) => {
        const userLocalData = window.localStorage.getItem("userData")
        if (userLocalData == null) return
        const userLocalDataObj = JSON.parse(userLocalData)

        if (!userLocalDataObj.jwt) return

        try {
            const response = await postUserMovie(userMovieData, userLocalDataObj?.jwt);
            const data = await response.json()

            setSeeMovies(prev => [...prev, data])

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message)
            }
        }
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const data = e.currentTarget;

        if (data && data.name == "vista") {

            if (isView) {
                setIsView(false)

                const userMovie = seeMovies.find(item => item.movieDTO.id == parseInt(data.id))
                const idUserMovie = userMovie?.id;
                const storageUser = window.localStorage.getItem("userData")

                let token;
                if (storageUser) {
                    token = JSON.parse(storageUser).jwt;
                }

                const newSeeMovies = seeMovies.filter(item => item.movieDTO.id != parseInt(data.id))
                setSeeMovies(newSeeMovies)

                if (token && idUserMovie) {
                    deleteUserMovieService(token, idUserMovie)
                }
                return
            }

            setIsView(true)
            let userMovieData;

            if (user?.username !== undefined) {
                userMovieData = {
                    username: user.username,
                    rating: 6,
                    movie: {
                        id: movie.id,
                        posterPath: movie.poster_path ?? URL_IMG_NOT_FOUND,
                        overview: movie.overview,
                        releaseDate: movie.release_date ?? "",
                        genres: movie.genre_ids?.map(String),
                        title: movie.title,
                        originalTitle: movie.original_title ?? "",
                        originalLanguage: movie.original_language ?? "",
                        runtime: 0,
                        view: true
                    }
                }
                fectchUserMovie(userMovieData);
            }
        }
    }
    return (
        <Box maxWidth="270px" >
            <Card size="2">
                <Inset clip="padding-box" side="top" pb="current">
                    <img
                        src={normalizedMovie.posterPath ? URL_IMG + normalizedMovie.posterPath : URL_IMG_NOT_FOUND}
                        alt="Portada de la pelicula"
                        style={{
                            display: "block",
                            objectFit: "cover",
                            width: "100%",
                            height: 290,
                            backgroundColor: "var(--gray-5)",
                        }}
                    />
                </Inset>
                <Box height="100%">
                    <Flex direction="column" gap="2" height="230px" justify="between">
                        <Box>
                            <Flex justify="end">
                                <Text>{normalizedMovie.releaseDate}</Text>
                            </Flex>
                            <Box pb="2">
                                <Text as="p" size="4" weight="medium">{normalizedMovie.title}</Text>
                            </Box>
                            <Text
                                style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >{normalizedMovie.overview}</Text>
                        </Box>
                        <Flex justify="end" gap="3" mt="1">
                            {user &&
                                <Button
                                    name="vista"
                                    id={
                                        normalizedMovie.id.toString()
                                    }
                                    color={isView ? "red" : undefined}
                                    onClick={(e) => handleClick(e)}
                                >
                                    {isView ? "Eliminar" : "Marcar como vista"}
                                </Button>
                            }
                            <Dialog.Root>
                                <Dialog.Trigger>
                                    <Button>Ver mas</Button>
                                </Dialog.Trigger>
                                <Dialog.Content size="1" maxWidth="50%" style={{ padding: "0px" }}>
                                    <CardMovieFull
                                        key={`${movie.id}F`}
                                        user={user}
                                        movie={normalizedMovie}
                                        isView={isView}
                                        handleClick={handleClick} />
                                </Dialog.Content>
                            </Dialog.Root>
                        </Flex>
                    </Flex>
                </Box>
            </Card>
        </Box>
    )
}