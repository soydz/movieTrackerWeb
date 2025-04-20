package com.soydz.service.impl;

import com.soydz.persistence.entity.UserEntity;
import com.soydz.persistence.repository.UserRepository;
import com.soydz.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<UserEntity> findUserEntityByUsername(String username) {
        return userRepository.findUserEntityByUsername(username);
    }
}
