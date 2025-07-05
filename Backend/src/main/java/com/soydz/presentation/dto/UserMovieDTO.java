package com.soydz.presentation.dto;

import com.soydz.persistence.entity.UserMovieEntity;

import java.time.LocalDate;

public record UserMovieDTO(
        Long id,
        Integer rating,
        LocalDate addedDate,
        MovieDTO movieDTO
) {

    public static UserMovieDTO fromEntity(UserMovieEntity userMovieEntity, MovieDTO movieDTO) {
        return new UserMovieDTO(
                userMovieEntity.getId(),
                userMovieEntity.getRating(),
                userMovieEntity.getAddedDate(),
                movieDTO
        );
    }
}
