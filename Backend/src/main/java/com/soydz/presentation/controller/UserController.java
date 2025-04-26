package com.soydz.presentation.controller;

import com.soydz.presentation.dto.request.UserRequestDTO;
import com.soydz.presentation.dto.response.UserResponseDTO;
import com.soydz.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/save")
    public ResponseEntity<UserResponseDTO> save(@RequestBody UserRequestDTO userRequestDTO) {
        return new ResponseEntity<>(userService.save(userRequestDTO), HttpStatus.CREATED);
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<UserResponseDTO>> getAll() {
        return new ResponseEntity<>(userService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<UserResponseDTO> getById(@PathVariable("id") Long id) {
        return userService.getById(id)
                .map(user -> new ResponseEntity<>(user, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Long id) {
        userService.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
