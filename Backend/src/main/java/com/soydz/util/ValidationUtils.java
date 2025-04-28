package com.soydz.util;

import com.soydz.persistence.entity.MovieEntity;
import com.soydz.presentation.dto.request.UserRequestDTO;
import com.soydz.presentation.dto.request.UserMovieRequestDTO;

import java.util.Collection;

public class ValidationUtils {

    public static boolean isNullOrBlank(String string) {
        return string == null || string.isBlank();
    }

    public static boolean isNullOrEmpty(Collection<?> collection) {
        return collection == null || collection.isEmpty();
    }

    public static boolean isInvalidMovieData(MovieEntity movie) {
        return movie.getId() == null ||
                isNullOrBlank(movie.getTitle()) ||
                isNullOrBlank(movie.getOriginalTitle()) ||
                isNullOrBlank(movie.getOverview());
    }

    public static boolean isInvalidCreateUserData(UserRequestDTO userRequestDTO) {
        return isNullOrBlank(userRequestDTO.username()) ||
                isNullOrBlank(userRequestDTO.email()) ||
                isNullOrBlank(userRequestDTO.password()) ||
                isNullOrEmpty(userRequestDTO.roleSet());
    }

    public static boolean isInvalidUserMovieRequestData(UserMovieRequestDTO userMovieRequestDTO) {
        return userMovieRequestDTO.user() == null ||
                userMovieRequestDTO.rating() == null ||
                isNullOrBlank(userMovieRequestDTO.movie().title()) ||
                isNullOrBlank(userMovieRequestDTO.movie().originalTitle()) ||
                isNullOrBlank(userMovieRequestDTO.movie().overview());
    }
}
