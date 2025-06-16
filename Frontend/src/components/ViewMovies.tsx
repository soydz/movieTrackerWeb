import { CardMovie } from "./CardMovie";
import dataMovies from "../mocks/movies.json"
import { Grid } from "@radix-ui/themes";

export function ViewMovies() {
    console.log(dataMovies.results)
    return (
        <Grid columns="4" gap="5" justify="center">
            {dataMovies.results.map(movie => (
                <CardMovie
                    key={movie.id}
                    title={movie.title}
                    overview={movie.overview}
                    release_date={movie.release_date}
                    poster_path={movie.poster_path}
                />
            ))}
        </Grid>
    )
}

// export function CardMovie({title, original_title, overview, release_date, poster_path, genre_ids, original_language}) {
