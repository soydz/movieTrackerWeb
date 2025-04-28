package com.soydz.presentation.dto.response;

import com.soydz.persistence.entity.RoleEntity;
import com.soydz.persistence.entity.UserEntity;

import java.util.Set;

public record UserResponseDTO(
        Long id,
        String username,
        String email,
        Set<RoleEntity> roleSet
) {
    public static UserResponseDTO fromEntity(UserEntity userEntity) {
        return new UserResponseDTO(userEntity.getId(), userEntity.getUsername(), userEntity.getEmail(), userEntity.getRoleSet());
    }

    public static UserEntity toEntity(UserResponseDTO userResponseDTO) {
        UserEntity userEntity = new UserEntity();

        userEntity.setId(userResponseDTO.id);
        userEntity.setUsername(userResponseDTO.username);
        userEntity.setEmail(userResponseDTO.email);
        userEntity.setRoleSet(userResponseDTO.roleSet);

        userEntity.setEnabled(true);
        userEntity.setCredentialNoExpired(true);
        userEntity.setAccountNoLocked(true);
        userEntity.setCredentialNoExpired(true);

        return userEntity;
    }
}