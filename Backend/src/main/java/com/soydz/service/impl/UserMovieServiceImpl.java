package com.soydz.service.impl;

import com.soydz.persistence.entity.MovieEntity;
import com.soydz.persistence.entity.UserEntity;
import com.soydz.persistence.entity.UserMovieEntity;
import com.soydz.persistence.repository.UserMovieRepository;
import com.soydz.presentation.dto.*;
import com.soydz.service.interfaces.MovieService;
import com.soydz.service.interfaces.UserMovieService;
import com.soydz.service.interfaces.UserService;
import com.soydz.util.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class UserMovieServiceImpl implements UserMovieService {

    @Autowired
    private UserMovieRepository userMovieRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private MovieService movieService;

    @Override
    public UserMovieResponseDTO save(UserMovieRequestDTO userMovieRequestDTO) {
        if(userMovieRequestDTO.movie().id() == null) {
            throw new IllegalArgumentException("Invalid userMovie data: movie id must not be null");
        }

        if(!movieService.existById(userMovieRequestDTO.movie().id())) {

            if (ValidationUtils.isInvalidUserMovieRequestData(userMovieRequestDTO)) {
                throw new IllegalArgumentException("Invalid userMovie data: rating, user and movie must not be null or empty");
            }

            movieService.save(userMovieRequestDTO.movie());
        }

        if (!userService.existsById(userMovieRequestDTO.user())) {
            throw new IllegalArgumentException("User not found");
        }

        if (this.existByUserMovie(userMovieRequestDTO.user(), userMovieRequestDTO.movie().id())) {
            throw new IllegalArgumentException("Duplicate entry: this movie has already been submitted by the user");
        }

        UserResponseDTO userResponseDTO = userService.getById(userMovieRequestDTO.user())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        UserEntity userEntity = UserResponseDTO.toEntity(userResponseDTO);
        MovieEntity movieEntity = MovieDTO.toEntity(userMovieRequestDTO.movie());

        UserMovieEntity userMovieEntity = UserMovieRequestDTO.toEntity(userMovieRequestDTO, userEntity, movieEntity);

        return UserMovieResponseDTO.fromEntity(userMovieRepository.save(userMovieEntity));
    }

    @Override
    public Optional<UserMovieResponseDTO> getById(Long id) {
        return userMovieRepository.findById(id)
                .map(userMovie -> UserMovieResponseDTO.fromEntity(userMovie));
    }

    @Override
    public void deleteById(Long id) {
        userMovieRepository.deleteById(id);
    }

    @Override
    public boolean existByUserMovie(Long userId, Long movieId) {
        return userMovieRepository.existsByUser_IdAndMovie_Id(userId, movieId);
    }

    @Override
    public List<UserMovieResponseDetailsDTO> getByUserId(Long id) {
        List<UserMovieEntity> userMovieEntity = userMovieRepository.findByUserId(id);

        UserResponseMinimalDTO userResponseMinimalDTO = userMovieEntity.stream()
                .findFirst()
                .map(userMovie -> UserResponseMinimalDTO.fromEntity(userMovie.getUser()))
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));

        MovieDTO movieDTO = userMovieEntity.stream()
                .findFirst()
                .map(userMovie -> MovieDTO.fromEntity(userMovie.getMovie()))
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));

        return userMovieEntity.stream()
                .map(userMovie -> UserMovieResponseDetailsDTO.fromEntity(userMovie, userResponseMinimalDTO, movieDTO))
                .toList();
    }
}
