package com.soydz.presentation.controller;

import com.soydz.presentation.dto.request.AuthLoginDTO;
import com.soydz.presentation.dto.request.AuthSignupDTO;
import com.soydz.presentation.dto.response.AuthResponseDTO;
import com.soydz.service.impl.UserDetailServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final UserDetailServiceImpl userDetailService;

    public AuthenticationController(UserDetailServiceImpl userDetailService) {
        this.userDetailService = userDetailService;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody AuthSignupDTO authSignupDTO) {
        return new ResponseEntity<>(this.userDetailService.createUser(authSignupDTO), HttpStatus.CREATED);
    }

    @PostMapping("/log-in")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthLoginDTO loginDTO) {
        return new ResponseEntity<>(this.userDetailService.loginUser(loginDTO), HttpStatus.OK);
    }
}
