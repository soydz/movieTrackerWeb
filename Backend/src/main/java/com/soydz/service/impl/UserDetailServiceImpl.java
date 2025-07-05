package com.soydz.service.impl;

import com.soydz.persistence.entity.UserEntity;
import com.soydz.presentation.dto.request.AuthLoginDTO;
import com.soydz.presentation.dto.request.AuthSignupDTO;
import com.soydz.presentation.dto.request.UserRequestDTO;
import com.soydz.presentation.dto.response.AuthResponseDTO;
import com.soydz.util.JwtUtils;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    private final UserServiceImpl userService;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    public UserDetailServiceImpl(UserServiceImpl userService, JwtUtils jwtUtils, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
        this.passwordEncoder = passwordEncoder;
    }

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

    public AuthResponseDTO createUser(AuthSignupDTO authSignupDTO) {
        UserEntity userCreated = userService.save(authSignupDTO);

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
                userCreated.getId(),
                userCreated.getUsername(),
                "User created successfully",
                accessToken,
                true
        );
    }

    public Authentication authentication(String username, String password) {
        UserDetails userDetails = this.loadUserByUsername(username);

        if(userDetails == null) {
            throw new BadCredentialsException("Invalid username or password");
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid username or password");
        }

        return new UsernamePasswordAuthenticationToken(username, userDetails.getPassword(), userDetails.getAuthorities());
    }

    public AuthResponseDTO loginUser(AuthLoginDTO loginDTO) {
        String username = loginDTO.username();
        String password = loginDTO.password();

        UserEntity userEntity = userService.findUserEntityByUsername(username).orElseThrow();

        Long userId = userEntity.getId();

        Authentication authentication = this.authentication(username, password);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = jwtUtils.createToken(authentication);

        return new AuthResponseDTO(
                userId,
                username,
                "User logged successfuly",
                accessToken,
                true
        );
    }
}
