package com.soydz.util;

import com.soydz.persistence.entity.MovieEntity;

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
}
