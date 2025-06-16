import { Box, Card, Flex, Inset, Text } from "@radix-ui/themes";

export function CardMovie({ title, original_title, overview, release_date, poster_path, genre_ids, original_language }) {
    const urlImg = "https://image.tmdb.org/t/p/w500";

    return (
        <Box maxWidth="270px" >
            <Card size="2">
                <Inset clip="padding-box" side="top" pb="current">
                    <img
                        src={urlImg + poster_path}
                        alt="Portada de la pelicula"
                        style={{
                            display: "block",
                            objectFit: "cover",
                            width: "100%",
                            height: 300,
                            backgroundColor: "var(--gray-5)",
                        }}
                    />
                </Inset>
                <Box height="100%">
                    <Flex direction="column" gap="2" height="190px">
                        <Text as="p" size="4">{title}</Text>
                        <Text align={"right"}>{release_date}</Text>
                        <Text
                            style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 4,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >{overview}</Text>
                    </Flex>
                </Box>
            </Card>
        </Box>

    )
}