package com.soydz.service.impl;

import com.soydz.persistence.entity.UserEntity;
import com.soydz.presentation.dto.request.UserRequestDTO;
import com.soydz.presentation.dto.response.AuthResponseDTO;
import com.soydz.presentation.dto.response.UserResponseDTO;
import com.soydz.service.interfaces.UserService;
import com.soydz.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {


        UserEntity userEntity = userService.findUserEntityByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("The user " + username + " not found"));

        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();

        // add roles
        userEntity.getRoleSet().forEach(role -> authorityList.add(
                new SimpleGrantedAuthority("ROLE_".concat(role.getRoleName().name()))
        ));

        // add permissions
        userEntity.getRoleSet().stream()
                .flatMap(role -> role.getPermissionSet().stream())
                .forEach(permission -> authorityList.add(
                        new SimpleGrantedAuthority(permission.getPermissionName().name())
                ));

        return new User(
                userEntity.getUsername(),
                userEntity.getPassword(),
                userEntity.isEnabled(),
                userEntity.isAccountNoExpired(),
                userEntity.isCredentialNoExpired(),
                userEntity.isAccountNoLocked(),
                authorityList
        );
    }

    public AuthResponseDTO createUser(UserRequestDTO userRequestDTO) {
        UserEntity userCreated = userService.save(userRequestDTO);

        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();

        userCreated.getRoleSet().forEach(roleEntity -> {
            authorityList.add(new SimpleGrantedAuthority("ROLE_".concat(roleEntity.getRoleName().name())));
        });

        userCreated.getRoleSet().stream()
                .flatMap(roleEntity -> roleEntity.getPermissionSet().stream())
                .forEach(permissionEntity -> authorityList.add(new SimpleGrantedAuthority(permissionEntity.getPermissionName().name())));

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userCreated.getUsername(),
                userCreated.getPassword(),
                authorityList
        );
        String accessToken = jwtUtils.createToken(authentication);

        return new AuthResponseDTO(
                userCreated.getUsername(), "User created successfully", accessToken, true
        );
    }
}
