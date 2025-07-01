package com.soydz.presentation.controller;

import com.soydz.presentation.dto.UserMovieDTO;
import com.soydz.presentation.dto.response.UserMovieResponseDTO2;
import com.soydz.presentation.dto.request.UserMovieRequestDTO;
import com.soydz.service.interfaces.UserMovieService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user-movie")
public class UserMovieController {

    private final UserMovieService userMovieService;

    public UserMovieController(UserMovieService userMovieService) {
        this.userMovieService = userMovieService;
    }

    @PostMapping("/save")
    public ResponseEntity<UserMovieDTO> save(@RequestBody UserMovieRequestDTO userMovieRequestDTO) {
        UserMovieDTO userMovieDTO = userMovieService.save(userMovieRequestDTO);
        return new ResponseEntity<>(userMovieDTO, HttpStatus.CREATED);
    }

    @GetMapping("/find/{username}")
    public ResponseEntity<UserMovieResponseDTO2> getByUserId(@PathVariable("username") String username) {
        return new ResponseEntity<>(userMovieService.getByUsername(username), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Long id) {
        userMovieService.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
