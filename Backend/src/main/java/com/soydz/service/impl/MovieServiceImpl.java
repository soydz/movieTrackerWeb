package com.soydz.service.impl;

import com.soydz.persistence.entity.MovieEntity;
import com.soydz.persistence.repository.MovieRepository;
import com.soydz.presentation.dto.MovieDTO;
import com.soydz.service.interfaces.MovieService;
import com.soydz.util.ValidationUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;

    public MovieServiceImpl(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @Override
    public MovieEntity save(MovieDTO movieDTO) {
        MovieEntity movie = MovieDTO.toEntity(movieDTO);

        if (ValidationUtils.isInvalidMovieData(movie)) {
            throw new IllegalArgumentException("Invalid movie data: id, title, original title and overview must not be null or empty");
        }

        if (this.existById(movie.getId())) {
            throw new IllegalArgumentException("Duplicate entry: this movie is already registered in the database");
        }

        return movieRepository.save(movie);
    }

    @Override
    public List<MovieDTO> getAll() {
        return movieRepository.findAll().stream()
                .map(movie -> MovieDTO.fromEntity(movie)).toList();
    }

    @Override
    public Optional<MovieDTO> getById(Long id) {
        return movieRepository.findById(id).map(movie -> MovieDTO.fromEntity(movie));
    }

    @Override
    public void deleteById(Long id) {
        movieRepository.deleteById(id);
    }

    @Override
    public boolean existById(Long id) {
        return movieRepository.existsById(id);
    }
}
