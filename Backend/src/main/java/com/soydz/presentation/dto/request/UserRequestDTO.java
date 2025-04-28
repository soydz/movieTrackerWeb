package com.soydz.presentation.dto.request;

import com.soydz.persistence.entity.RoleEntity;
import com.soydz.persistence.entity.UserEntity;

import java.util.Set;

public record UserRequestDTO(
        String username,
        String email,
        String password,
        Set<String> roleSet
) {
    public static UserEntity toEntity(UserRequestDTO userRequestDTO, String encryptedPassword, Set<RoleEntity> roleSet) {
        UserEntity userEntity = new UserEntity();

        userEntity.setUsername(userRequestDTO.username());
        userEntity.setEmail(userRequestDTO.email());
        userEntity.setPassword(encryptedPassword);
        userEntity.setRoleSet(roleSet);
        userEntity.setEnabled(true);
        userEntity.setAccountNoExpired(true);
        userEntity.setAccountNoLocked(true);
        userEntity.setCredentialNoExpired(true);

        return userEntity;
    }
}
