package com.soydz.presentation.dto;

import com.soydz.persistence.entity.MovieEntity;

import java.time.LocalDate;
import java.util.Set;

public record MovieDTO(
        Long id,
        Set<String> genreSet,
        String originalLanguage,
        String originalTitle,
        String title,
        String overview,
        String posterPath,
        LocalDate releaseDate,
        Integer runtime
) {
    public static MovieDTO fromEntity(MovieEntity movie) {

        return new MovieDTO(
                movie.getId(),
                movie.getGenreSet(),
                movie.getOriginalLanguage(),
                movie.getOriginalTitle(),
                movie.getTitle(),
                movie.getOverview(),
                movie.getPosterPath(),
                movie.getReleaseDate(),
                movie.getRuntime()
        );
    }

    public static MovieEntity toEntity(MovieDTO movieDTO) {
        MovieEntity movieEntity = new MovieEntity();

        movieEntity.setId(movieDTO.id());
        movieEntity.setGenreSet(movieDTO.genreSet());
        movieEntity.setOriginalLanguage(movieDTO.originalLanguage());
        movieEntity.setOriginalTitle(movieDTO.originalTitle());
        movieEntity.setTitle(movieDTO.title());
        movieEntity.setOverview(movieDTO.overview());
        movieEntity.setPosterPath(movieDTO.posterPath());
        movieEntity.setReleaseDate(movieDTO.releaseDate());
        movieEntity.setRuntime(movieDTO.runtime());

        return movieEntity;
    }
}