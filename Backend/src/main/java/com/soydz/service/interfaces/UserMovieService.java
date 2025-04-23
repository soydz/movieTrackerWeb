package com.soydz.service.interfaces;

import com.soydz.presentation.dto.UserMovieResponseDetailsDTO;
import com.soydz.presentation.dto.UserMovieRequestDTO;
import com.soydz.presentation.dto.UserMovieResponseDTO;

import java.util.List;
import java.util.Optional;

public interface UserMovieService {
    UserMovieResponseDTO save(UserMovieRequestDTO userMovieEntity);

    Optional<UserMovieResponseDTO> getById(Long id);

    void deleteById(Long id);

    boolean existByUserMovie(Long userId, Long movieId);

    List<UserMovieResponseDetailsDTO> getByUserId(Long id);
}
