import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes"
import { genres } from "../util/genres";
import { ImdbIcon } from "./icons/ImdbIcon";
import type { PopularMovies } from "../interfaces/movie";

const UR_LIMG = import.meta.env.VITE_THE_MOVIE_DB_URL_IMG;
const URL_IMG_NOT_FOUND = import.meta.env.VITE_IMG_NOT_FOUND_URL

interface SlideCarouselProps {
    movie: PopularMovies
}

export const SlideCarousel = ({ movie }: SlideCarouselProps) => {

    return (
        <Box flexGrow="1" >
            {
                movie &&
                <div className="embla__slide" >
                    <Card style={{ padding: "0" }} mx="4">
                        <Grid columns="2fr 3fr" height="450px" width="750px">
                            <img
                                src={movie.poster_path ? UR_LIMG + movie.poster_path : URL_IMG_NOT_FOUND}
                                alt="Portada de la pelicula"
                                style={{
                                    display: "block",
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "var(--gray-5)",
                                }}
                            />
                            <Box p="5">
                                <Flex direction="row" justify="between">
                                    <Text>{
                                        movie.genre_ids.map((id: number) => <Text
                                            key={id}
                                            as="span"
                                            mr="2">
                                            {`${genres[id]},`}
                                        </Text>)
                                    }</Text>
                                </Flex>
                                <Flex direction="row" mt="2" justify="between">
                                    <Flex direction="column" justify="center">
                                        <Text>{movie.vote_average}</Text>
                                        <ImdbIcon width="36px" height="36px" color="#F5C518"/>
                                    </Flex>
                                    <Flex direction="column" align="center" justify="center">
                                        <Text align="right">{movie.release_date}</Text>
                                        <Text>Estreno</Text>
                                    </Flex>
                                </Flex>
                                <Box py="4">
                                    <Heading as="h2">{movie.title}</Heading>
                                    <Box py="4">
                                        <Text as="p">{movie.overview}</Text>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Card>
                </div>
            }
        </Box>
    )
}
