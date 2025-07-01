package com.soydz.presentation.dto.response;

import com.soydz.presentation.dto.UserMovieDTO;

import java.util.List;

public record UserMovieResponseDTO2(
        String username,
        List<UserMovieDTO> userMovieDTOList
) {
}
