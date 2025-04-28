package com.soydz.presentation.controller;

import com.soydz.presentation.dto.response.UserMovieResponseDetailsDTO;
import com.soydz.presentation.dto.request.UserMovieRequestDTO;
import com.soydz.presentation.dto.response.UserMovieResponseDTO;
import com.soydz.service.interfaces.UserMovieService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-movie")
public class UserMovieController {

    private final UserMovieService userMovieService;

    public UserMovieController(UserMovieService userMovieService) {
        this.userMovieService = userMovieService;
    }

    @PostMapping("/save")
    public ResponseEntity<UserMovieResponseDTO> save(@RequestBody UserMovieRequestDTO userMovieRequestDTO) {
        UserMovieResponseDTO userMovieResponseDTO = userMovieService.save(userMovieRequestDTO);

        return new ResponseEntity<>(userMovieResponseDTO, HttpStatus.CREATED);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<UserMovieResponseDTO> getById(@PathVariable("id") Long id) {
        return userMovieService.getById(id)
                .map(userMovie -> new ResponseEntity<>(userMovie, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/find/user/{id}")
    public ResponseEntity<List<UserMovieResponseDetailsDTO>> getByUserId(@PathVariable("id") Long id) {
        return new ResponseEntity<>(userMovieService.getByUserId(id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Long id) {
        userMovieService.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
