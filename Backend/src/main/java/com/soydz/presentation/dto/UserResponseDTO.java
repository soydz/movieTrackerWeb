package com.soydz.presentation.dto;

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
}
