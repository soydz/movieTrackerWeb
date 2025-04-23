package com.soydz.presentation.dto;

import com.soydz.persistence.entity.UserMovieEntity;

import java.time.LocalDate;

public record UserMovieResponseDetailsDTO(
        Long id,
        Integer rating,
        LocalDate addedDate,
        UserResponseMinimalDTO user,
        MovieDTO movie
) {
    public static UserMovieResponseDetailsDTO fromEntity(UserMovieEntity userMovieEntity, UserResponseMinimalDTO userResponseMinimalDTO, MovieDTO movieDTO) {
        return new UserMovieResponseDetailsDTO(
                userMovieEntity.getId(),
                userMovieEntity.getRating(),
                userMovieEntity.getAddedDate(),
                userResponseMinimalDTO,
                movieDTO
        );

    }
}