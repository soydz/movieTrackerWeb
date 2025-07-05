import { useEffect, useState } from "react"
import getMoviesUser from "../services/getMoviesUser"
import { ViewMovies } from "../components/ViewMovies";
import { Box, Button, Flex, Grid, Heading, Skeleton, Text } from "@radix-ui/themes";
import type { User, UserDataLocalStorage } from "../interfaces/user";
import type { DataMovieUSer, SeeMovie, UserMovieDTO } from "../interfaces/movie";
import { Alert } from "../components/Alert";

interface PelículasVistasPageProps {
    user: User | null,
    seeMovies: Array<SeeMovie>,
    setSeeMovies: React.Dispatch<React.SetStateAction<Array<SeeMovie>>>
}

export const PeliculasVistasPage = ({ user, seeMovies, setSeeMovies }: PelículasVistasPageProps) => {

    if (!user) return null

    const [dataMoviesUser, setDataMoviesUser] = useState<DataMovieUSer | null>(null);
    const [stateAlert, setStateAlert] = useState({
        status: false,
        title: "",
        description: ""
    })

    useEffect(() => {
        const userDataString: string | null = window.localStorage.getItem("userData")
        if (userDataString == null) return
        const userData: UserDataLocalStorage = JSON.parse(userDataString)

        const fectMoviesUSer = async () => {
            try {
                if (userData) {
                    const response = await getMoviesUser(userData.username, userData.jwt);
                    const { status } = await response;

                    if (status == 403) return

                    const data = await response.json();

                    setDataMoviesUser(data);
                }

            } catch (error: unknown) {
                if (error instanceof Error) {
                    setStateAlert({
                        status: true,
                        title: "Error de servidor",
                        description: `${error.message} Inténtelo más tarde`
                    })
                }
            }
        }

        fectMoviesUSer();

    }, [])

    const movies = dataMoviesUser?.userMovieDTOList.map((item: UserMovieDTO) => {
        return item.movieDTO
    })

    return (
        <Flex align="center" justify="center" mt="8">
            {
                movies && movies.length > 0 &&
                <ViewMovies movies={movies} user={user} seeMovies={seeMovies} setSeeMovies={setSeeMovies} />
            }

            {
                !movies &&
                <Grid columns="4" gap="5" justify="center">
                    {
                        Array.from({ length: 4 }).map((_, i) => (
                            <Box key={i} maxWidth="270px" width="270px">
                                <Skeleton>
                                    <Box height="290px"></Box>
                                </Skeleton>
                                <Flex justify="end" mt="2">
                                    <Skeleton>
                                        <Text>2022-01-31</Text>
                                    </Skeleton>
                                </Flex>
                                <Skeleton mt="2">
                                    <Box width="100%" height="40px"></Box>
                                </Skeleton>
                                <Skeleton mt="2">
                                    <Box width="100%" height="60px"></Box>
                                </Skeleton>
                                <Flex justify="end" mt="2" gap="2">
                                    <Skeleton>
                                        <Button>Eliminar</Button>
                                    </Skeleton>
                                    <Skeleton>
                                        <Button>Ver mas</Button>
                                    </Skeleton>
                                </Flex>
                            </Box>
                        ))}
                </Grid>
            }

            {
                movies && movies.length == 0 &&
                <Heading>🎬 Aún no has marcado películas como vistas. ¡Explora y márcalas!</Heading>
            }

            {
                <Alert status={stateAlert.status} title={stateAlert.title} description={stateAlert.description} setStateAlert={setStateAlert} />
            }
        </Flex>
    )
}
