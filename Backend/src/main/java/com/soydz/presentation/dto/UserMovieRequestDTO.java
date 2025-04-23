package com.soydz.presentation.dto;

import com.soydz.persistence.entity.MovieEntity;
import com.soydz.persistence.entity.UserEntity;
import com.soydz.persistence.entity.UserMovieEntity;

import java.time.LocalDate;

public record UserMovieRequestDTO(
        Long id,
        Integer rating,
        LocalDate addedDate,
        Long user,
        MovieDTO movie
) {
    public static UserMovieEntity toEntity(UserMovieRequestDTO userMovieRequestDTO, UserEntity user, MovieEntity movie) {
        UserMovieEntity userMovieEntity = new UserMovieEntity();

        userMovieEntity.setRating(userMovieRequestDTO.rating);
        userMovieEntity.setUser(user);
        userMovieEntity.setMovie(movie);

        return userMovieEntity;
    }
}
