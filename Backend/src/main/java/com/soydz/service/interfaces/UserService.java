package com.soydz.service.interfaces;

import com.soydz.persistence.entity.UserEntity;

import java.util.Optional;

public interface UserService {
    Optional<UserEntity> findUserEntityByUsername(String username);
}
