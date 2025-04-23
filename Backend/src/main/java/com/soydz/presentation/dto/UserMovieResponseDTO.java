package com.soydz.presentation.dto;

import com.soydz.persistence.entity.UserMovieEntity;

import java.time.LocalDate;

public record UserMovieResponseDTO(
        Long id,
        Integer rating,
        LocalDate addedDate,
        Long user,
        Long movie
) {
    public static UserMovieResponseDTO fromEntity(UserMovieEntity userMovieEntity) {
        return new UserMovieResponseDTO(
                userMovieEntity.getId(),
                userMovieEntity.getRating(),
                userMovieEntity.getAddedDate(),
                userMovieEntity.getUser().getId(),
                userMovieEntity.getMovie().getId()
        );
    }
}
