package com.soydz.presentation.dto.request;

import com.soydz.persistence.entity.RoleEntity;
import com.soydz.persistence.entity.UserEntity;

import java.util.Set;

public record AuthSignupDTO(
            String username,
            String email,
            String password,
            Set<String> roleSet
    ) {
        public static UserEntity toEntity(AuthSignupDTO signupDTO, String encryptedPassword, Set<RoleEntity> roleSet) {
            UserEntity userEntity = new UserEntity();

            userEntity.setUsername(signupDTO.username());
            userEntity.setEmail(signupDTO.email());
            userEntity.setPassword(encryptedPassword);
            userEntity.setRoleSet(roleSet);
            userEntity.setEnabled(true);
            userEntity.setAccountNoExpired(true);
            userEntity.setAccountNoLocked(true);
            userEntity.setCredentialNoExpired(true);

            return userEntity;
        }
    }
