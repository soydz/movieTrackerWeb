import { Cross1Icon } from "@radix-ui/react-icons";
import { Box, Button, Dialog, Flex, Grid, Heading, Text } from "@radix-ui/themes"
import { genres } from "../util/genres";

const URL_IMG = import.meta.env.VITE_THE_MOVIE_DB_URL_IMG;
const URL_IMG_NOT_FOUND = import.meta.env.VITE_IMG_NOT_FOUND_URL

export const CardMovieFull = ({ user, movie, isView, handleClick }) => {
    return (
        <Grid columns="2fr 3fr" width="100%">
            <Box>
                <img
                    src={movie.posterPath ? URL_IMG + movie.posterPath : URL_IMG_NOT_FOUND}
                    alt="Portada de la pelicula"
                    style={{
                        display: "block",
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "var(--gray-5)",
                    }}
                />
            </Box>
            <Box p="5" >
                <Flex justify="end">
                    <Dialog.Title>
                        <Dialog.Close>
                            <Button color="red">
                                <Flex gap="1" align="center">
                                    <Cross1Icon width="16" height="16" />
                                    <Text as="p" size="2">Cerrar</Text>
                                </Flex>
                            </Button>

                        </Dialog.Close>
                    </Dialog.Title>
                    <Dialog.Description></Dialog.Description>
                </Flex>

                <Box py="4">
                    <Flex direction="row" justify="between">
                        <Text>{
                            movie.genres.map(id => <Text
                                key={id}
                                as="span"
                                mr="2">
                                {`${genres[id]},`}
                            </Text>)
                        }</Text>
                        <Flex direction="column" align="center">
                            <Text align="right">{movie.releaseDate}</Text>
                            <Text>Estreno</Text>
                        </Flex>
                    </Flex>

                    <Box pb="4">
                        <Heading as="h2" >{movie.title}</Heading>
                        <Box py="4">
                            <Text as="p">{movie.overview}</Text>
                        </Box>
                        {user &&

                            <Flex justify="end">
                                {
                                    !isView && <Button name="vista" onClick={(e) => handleClick(e)}>Marcar como vista</Button>
                                }
                            </Flex>
                        }
                    </Box>
                </Box>

            </Box>
        </Grid>
    )
}
