package com.soydz.service.interfaces;

import com.soydz.persistence.entity.MovieEntity;
import com.soydz.presentation.dto.MovieDTO;

import java.util.List;
import java.util.Optional;

public interface MovieService {
    MovieEntity save(MovieDTO movie);

    List<MovieDTO> getAll();

    Optional<MovieDTO> getById(Long id);

    void deleteById(Long id);

    boolean existById(Long id);
}
