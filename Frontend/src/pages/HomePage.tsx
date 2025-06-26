import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes"
import { useEffect, useState } from "react"
import getMoviesDBPopular from "../services/getMoviesDBPopular"
import { Carousel } from "../components/Carousel"

export const HomePage = () => {

    const [popularMovies, setPopularMovies] = useState()

    useEffect(() => {
        const fecthPopularMovies = async () => {
            const response = await getMoviesDBPopular();
            const data = await response.json();

            setPopularMovies(data.results)
        }

        fecthPopularMovies();
    }, [])
    return (
        <Container mt="5">
            <Heading as="h1" size="8" my="4">Movie Tracker</Heading>
            <Flex direction="column" gap="4">
                <Text as="p">Movie Tracker es tu espacio personal para descubrir, organizar y seguir tu camino en el mundo del cine. Ya sea que busques un clásico, una novedad o una recomendación personalizada, aquí lo tienes todo.</Text>
                <Box>
                    <Heading as="h3" size="5">🔍 Descubre nuevas películas</Heading>
                    <Text as="p">Explora las películas más populares del momento, los últimos estrenos en cartelera o descubre joyas ocultas que podrían convertirse en tus favoritas. Nuestra base de datos se actualiza constantemente gracias a la API de The Movie Database.</Text>
                </Box>
                <Box>
                    <Heading as="h3" size="5"> 👤 Tu perfil, tus películas</Heading>
                    <Text as="p">Accede a tu perfil y lleva el registro de tus peliculas vistas, agregar favoritas o eliminar las que ya no quieres seguir. Todo se guarda en tu cuenta para que nunca pierdas el progreso.</Text>
                </Box>
                <Flex direction="column">
                    <Carousel popularMovies={popularMovies} title="Películas populares del momento"/>
                </Flex>
            </Flex>
        </Container>
    )
}