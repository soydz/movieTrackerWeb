import type { Movie, SeeMovie } from "../interfaces/movie";
import type { User } from "../interfaces/user";
import { CardMovie } from "./CardMovie";
import { Grid } from "@radix-ui/themes";

interface ViewMoviesProps {
    movies: Array<Movie>,
    user: User | null,
    seeMovies: Array<SeeMovie>,
    setSeeMovies: React.Dispatch<React.SetStateAction<Array<SeeMovie>>>
}

export const ViewMovies = ({ movies, user, seeMovies, setSeeMovies }: ViewMoviesProps) => {
    return (
        <Grid columns="4" gap="5" justify="center">
            {
                movies.length > 0 && movies.map(item => {
                    return (
                        <CardMovie
                            key={item.id}
                            movie={item}
                            user={user}
                            seeMovies={seeMovies}
                            setSeeMovies={setSeeMovies}
                        />
                    )
                })}
        </Grid>
    )
}
