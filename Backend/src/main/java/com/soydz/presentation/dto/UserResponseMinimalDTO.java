package com.soydz.presentation.dto;

import com.soydz.persistence.entity.UserEntity;

public record UserResponseMinimalDTO(
        Long id,
        String username
) {
    public static UserResponseMinimalDTO fromEntity(UserEntity userEntity) {
        return new UserResponseMinimalDTO(
                userEntity.getId(),
                userEntity.getUsername()
        );
    }
}