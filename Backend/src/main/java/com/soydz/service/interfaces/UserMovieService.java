package com.soydz.service.interfaces;

import com.soydz.presentation.dto.UserMovieDTO;
import com.soydz.presentation.dto.response.UserMovieResponseDTO2;
import com.soydz.presentation.dto.response.UserMovieResponseDetailsDTO;
import com.soydz.presentation.dto.request.UserMovieRequestDTO;
import com.soydz.presentation.dto.response.UserMovieResponseDTO;

import java.util.List;
import java.util.Optional;

public interface UserMovieService {
    UserMovieDTO save(UserMovieRequestDTO userMovieEntity);

    Optional<UserMovieResponseDTO> getById(Long id);

    void deleteById(Long id);

    boolean existByUserMovie(Long userId, Long movieId);

    UserMovieResponseDTO2 getByUsername(String username);
}
