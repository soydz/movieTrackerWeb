package com.soydz.service.impl;

import com.soydz.persistence.entity.MovieEntity;
import com.soydz.persistence.entity.UserEntity;
import com.soydz.persistence.entity.UserMovieEntity;
import com.soydz.persistence.repository.UserMovieRepository;
import com.soydz.presentation.dto.MovieDTO;
import com.soydz.presentation.dto.UserMovieDTO;
import com.soydz.presentation.dto.request.UserMovieRequestDTO;

import com.soydz.presentation.dto.response.*;
import com.soydz.service.interfaces.MovieService;
import com.soydz.service.interfaces.UserMovieService;
import com.soydz.service.interfaces.UserService;
import com.soydz.util.ValidationUtils;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserMovieServiceImpl implements UserMovieService {

    private final UserMovieRepository userMovieRepository;
    private final UserService userService;
    private final MovieService movieService;

    public UserMovieServiceImpl(UserMovieRepository userMovieRepository, UserService userService, MovieService movieService) {
        this.userMovieRepository = userMovieRepository;
        this.userService = userService;
        this.movieService = movieService;
    }

    @Override
    public UserMovieDTO save(UserMovieRequestDTO userMovieRequestDTO) {
        if(userMovieRequestDTO.movie().id() == null) {
            throw new IllegalArgumentException("Invalid userMovie data: movie id must not be null");
        }

        if(!movieService.existById(userMovieRequestDTO.movie().id())) {

            if (ValidationUtils.isInvalidUserMovieRequestData(userMovieRequestDTO)) {
                throw new IllegalArgumentException("Invalid userMovie data: rating, user and movie must not be null or empty");
            }

            movieService.save(userMovieRequestDTO.movie());
        }

        UserEntity user = userService.findUserEntityByUsername(userMovieRequestDTO.username()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (this.existByUserMovie(user.getId(), userMovieRequestDTO.movie().id())) {
            throw new IllegalArgumentException("Duplicate entry: this movie has already been submitted by the user");
        }

        UserResponseDTO userResponseDTO = userService.getById(user.getId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        UserEntity userEntity = UserResponseDTO.toEntity(userResponseDTO);
        MovieEntity movieEntity = MovieDTO.toEntity(userMovieRequestDTO.movie());

        UserMovieEntity userMovieEntity = UserMovieRequestDTO.toEntity(userMovieRequestDTO, userEntity, movieEntity);
        UserMovieEntity userMovieEntityUpdate = userMovieRepository.save(userMovieEntity);

        return UserMovieDTO.fromEntity(userMovieEntityUpdate, userMovieRequestDTO.movie());
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
    public UserMovieResponseDTO2 getByUsername(String username) {
        UserEntity userEntity = userService.findUserEntityByUsername(username).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        List<UserMovieEntity> userMovieEntityList = userMovieRepository.findByUserId(userEntity.getId());

        List<UserMovieDTO> userMovieDTOList = userMovieEntityList.stream()
                .map( item -> new UserMovieDTO(
                        item.getId(),
                        item.getRating(),
                        item.getAddedDate(),
                        MovieDTO.fromEntity(item.getMovie())
                )).collect(Collectors.toList());

        return new UserMovieResponseDTO2(username, userMovieDTOList);
    }
}
