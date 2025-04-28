package com.soydz.service.interfaces;

import com.soydz.persistence.entity.UserEntity;
import com.soydz.presentation.dto.request.UserRequestDTO;
import com.soydz.presentation.dto.response.UserResponseDTO;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<UserEntity> findUserEntityByUsername(String username);

    UserEntity save(UserRequestDTO user);

    List<UserResponseDTO> getAll();

    Optional<UserResponseDTO> getById(Long id);

    void deleteById(Long id);

    boolean existsById(Long id);
}
