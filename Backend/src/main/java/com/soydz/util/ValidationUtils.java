package com.soydz.util;

import com.soydz.persistence.entity.MovieEntity;
import com.soydz.presentation.dto.request.AuthLoginDTO;
import com.soydz.presentation.dto.request.AuthSignupDTO;
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

    public static boolean isInvalidLoginUserData(AuthLoginDTO login) {
        return isNullOrBlank(login.username()) ||
                isNullOrBlank(login.password());
    }

    public static boolean isInvalidCreateUserData(AuthSignupDTO signupDTO) {
        return isNullOrBlank(signupDTO.username()) ||
                isNullOrBlank(signupDTO.email()) ||
                isNullOrBlank(signupDTO.password()) ||
                isNullOrEmpty(signupDTO.roleSet());
    }

    public static boolean isInvalidUserMovieRequestData(UserMovieRequestDTO userMovieRequestDTO) {
        return userMovieRequestDTO.username() == null ||
                userMovieRequestDTO.rating() == null ||
                isNullOrBlank(userMovieRequestDTO.movie().title()) ||
                isNullOrBlank(userMovieRequestDTO.movie().originalTitle()) ||
                isNullOrBlank(userMovieRequestDTO.movie().overview());
    }
}
