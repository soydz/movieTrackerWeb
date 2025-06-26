import { CardMovie } from "./CardMovie";
import { Grid } from "@radix-ui/themes";

export const ViewMovies = ({ movies, user, seeMovies, setSeeMovies }) => {
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
