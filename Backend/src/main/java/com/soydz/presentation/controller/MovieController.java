package com.soydz.presentation.controller;

import com.soydz.persistence.entity.MovieEntity;
import com.soydz.presentation.dto.MovieDTO;
import com.soydz.service.interfaces.MovieService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @PostMapping("/save")
    public ResponseEntity<URI> save(@RequestBody MovieDTO movieDTO) throws URISyntaxException {
        MovieEntity movie = movieService.save(movieDTO);

        return new ResponseEntity<>(new URI("api/movies/find/" + movie.getId()), HttpStatus.CREATED);
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<MovieDTO>> getAll() {
        List<MovieDTO> movieDTOList = movieService.getAll();

        return new ResponseEntity<>(movieDTOList, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<MovieDTO> getById(@PathVariable("id") Long id) {
        return movieService.getById(id)
                .map(movie -> new ResponseEntity<>(movie, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Long id) {
        movieService.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}












