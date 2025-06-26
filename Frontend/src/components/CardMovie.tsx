import { Box, Button, Card, Dialog, Flex, Inset, Text } from "@radix-ui/themes";
import postUserMovie from "../services/postUserMovie";
import normalizeMovie from "../util/normalizeMovie";
import deleteUserMovieService from "../services/deleteUserMovieService";
import { CardMovieFull } from "./CardMovieFull";
import { useEffect, useState } from "react";

const URL_IMG = import.meta.env.VITE_THE_MOVIE_DB_URL_IMG;
const URL_IMG_NOT_FOUND = import.meta.env.VITE_IMG_NOT_FOUND_URL

export const CardMovie = ({ movie, user, seeMovies, setSeeMovies }) => {

    const [isView, setIsView] = useState(() => {
        seeMovies.some(item => item.movieDTO.id == movie.id)
    })

    useEffect(() => {
        if (seeMovies.length > 0) {
            const isView = seeMovies.some(item => item.movieDTO.id == movie.id);
            setIsView(isView);
        } else {
            setIsView(false);
        }
    }, [seeMovies, movie.id]);


    const normalizedMovie = normalizeMovie(movie)

    const fectchUserMovie = async (userMovieData) => {
        let token = window.localStorage.getItem("userData")
        if (token == null) return
        token = JSON.parse(token)

        try {
            const response = await postUserMovie(userMovieData, token.jwt);
            const data = await response.json()

            setSeeMovies(prev => [...prev, data])

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message)
            }
        }
    }

    const handleClick = (e) => {
        const data = e.nativeEvent.target;

        if (data && data.name == "vista") {

            if (isView) {
                setIsView(false);
                const idUserMovie = seeMovies.find(item => item.movieDTO.id == data.id).id
                const storageUser = window.localStorage.getItem("userData")
                const token = JSON.parse(storageUser).jwt;

                const newSeeMovies = seeMovies.filter(item => item.movieDTO.id != data.id)
                setSeeMovies(newSeeMovies)

                deleteUserMovieService(token, idUserMovie)
                return
            }

            setIsView(true)
            const userMovieData = {
                username: user.username,
                rating: 6,
                movie: {
                    id: movie.id,
                    posterPath: movie.poster_path,
                    overview: movie.overview,
                    releaseDate: movie.release_date,
                    genres: movie.genre_ids,
                    title: movie.title,
                    originalTitle: movie.original_title,
                    originalLanguage: movie.original_language,
                    runtime: 0,
                    view: true
                }
            }
            fectchUserMovie(userMovieData);
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
                                        normalizedMovie.id
                                    }
                                    color={isView && "red"}
                                    onClick={(e) => handleClick(e)}
                                >
                                    {isView && isView ? "Eliminar" : "Marcar como vista"}
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