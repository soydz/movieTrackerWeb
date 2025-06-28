import { Box, Container, Flex } from "@radix-ui/themes";
import { Search } from "../components/Search";
import { ViewMovies } from "../components/ViewMovies";
import { useEffect, useState } from "react";
import getMoviesDB from "../services/getMoviesDB";
import type { User } from "../interfaces/user";
import type { Movie, SeeMovie } from "../interfaces/movie";

interface BuscarPeliculasPageProps {
  user: User | null,
  seeMovies: Array<SeeMovie>,
  setSeeMovies: React.Dispatch<React.SetStateAction<Array<SeeMovie>>>
}

export const BuscarPeliculasPage = ({ user, seeMovies, setSeeMovies }: BuscarPeliculasPageProps) => {
  const [nameMovie, setNameMovie] = useState<string>("");
  const [movies, setMovies] = useState<Array<Movie>>([]);

  useEffect(() => {
    if (!nameMovie || nameMovie.length < 3) {
      return
    }

    const fetchMovies = async () => {
      try {
        const response = await getMoviesDB(nameMovie);
        const data = await response.json();
        setMovies(data.results ?? []);

      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

    fetchMovies();

  }, [nameMovie])

  return (
    <Flex align="center" justify="center">
      <Box>
        <Flex align="center">
          <Box>
            <Search nameMovie={nameMovie} setNameMovie={setNameMovie} />
            <Container>
              <ViewMovies movies={movies} user={user} seeMovies={seeMovies} setSeeMovies={setSeeMovies} />
            </Container>
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}
