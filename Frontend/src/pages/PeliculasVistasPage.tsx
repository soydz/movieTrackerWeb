import { useEffect, useState } from "react"
import getMoviesUser from "../services/getMoviesUser"
import { ViewMovies } from "../components/ViewMovies";
import { Box, Button, Flex, Grid, Skeleton, Text } from "@radix-ui/themes";
import type { User } from "../interfaces/user";
import type { SeeMovie } from "../interfaces/movie";

interface PelículasVistasPageProps {
    user: User,
    seeMovies: Array<SeeMovie>,
    setSeeMovies: Array<SeeMovie>
}
export const PeliculasVistasPage = ({ user, seeMovies, setSeeMovies }: PelículasVistasPageProps) => {

    const [dataMoviesUser, setDataMoviesUser] = useState([]);

    useEffect(() => {
        let userData = window.localStorage.getItem("userData")
        if (userData == null) return
        userData = JSON.parse(userData)

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
                    console.error(error.message)
                }
            }
        }

        fectMoviesUSer();

    }, [])

    const movies = dataMoviesUser.userMovieDTOList && dataMoviesUser.userMovieDTOList.map(item => {
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
        </Flex>
    )
}
