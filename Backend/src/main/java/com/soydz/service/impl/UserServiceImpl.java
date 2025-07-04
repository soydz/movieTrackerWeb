package com.soydz.service.impl;

import com.soydz.persistence.entity.RoleEntity;
import com.soydz.persistence.entity.UserEntity;
import com.soydz.persistence.repository.UserRepository;
import com.soydz.presentation.dto.request.AuthLoginDTO;
import com.soydz.presentation.dto.request.AuthSignupDTO;
import com.soydz.presentation.dto.request.UserRequestDTO;
import com.soydz.presentation.dto.response.UserResponseDTO;
import com.soydz.service.interfaces.RoleService;
import com.soydz.service.interfaces.UserService;
import com.soydz.util.ValidationUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, RoleService roleService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserEntity save(AuthSignupDTO signupDTO) {
        if (ValidationUtils.isInvalidCreateUserData(signupDTO)) {
            throw new IllegalArgumentException("Invalid user data: username and password must not be null or empty");
        }

        userRepository.findUserEntityByUsername(signupDTO.username()).ifPresent(
                userEntity -> {
                    throw new IllegalArgumentException("Username is already in use");
                }
        );

        Set<RoleEntity> roleEntitySet = roleService.findRoleEntitiesByRoleNameIn(signupDTO.roleSet()).stream().collect(Collectors.toSet());
        String encryptedPassword = passwordEncoder.encode(signupDTO.password());

        UserEntity userEntity = AuthSignupDTO.toEntity(signupDTO, encryptedPassword, roleEntitySet);

        return userRepository.save(userEntity);
    }

    @Override
    public List<UserResponseDTO> getAll() {
        return userRepository.findAll().stream()
                .map(user -> UserResponseDTO.fromEntity(user))
                .toList();
    }

    @Override
    public Optional<UserResponseDTO> getById(Long id) {
        return userRepository.findById(id)
                .map(user -> UserResponseDTO.fromEntity(user));
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<UserEntity> findUserEntityByUsername(String username) {
        return userRepository.findUserEntityByUsername(username);
    }

    @Override
    public boolean existsById(Long id) {
        return userRepository.existsById(id);
    }
}
