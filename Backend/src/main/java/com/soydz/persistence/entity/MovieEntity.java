package com.soydz.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "movies")
public class MovieEntity {
    @Id
    private Long id;
    @Column(name = "genres")
    private Set<String> genreSet;
    @Column(name = "original_language")
    private String originalLanguage;
    @Column(name = "original_title", nullable = false)
    private String originalTitle;
    @Column(nullable = false)
    private String title;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String overview;
    @Column(name = "poster_path")
    private String posterPath;
    @Column(name = "release_date", columnDefinition = "DATE")
    private LocalDate releaseDate;
    private Integer runtime;


    public MovieEntity() {
    }

    public MovieEntity(Long id, Set<String> genreSet, String originalLanguage, String originalTitle, String title, String overview, String posterPath, LocalDate releaseDate, Integer runtime) {
        this.id = id;
        this.genreSet = genreSet;
        this.originalLanguage = originalLanguage;
        this.originalTitle = originalTitle;
        this.title = title;
        this.overview = overview;
        this.posterPath = posterPath;
        this.releaseDate = releaseDate;
        this.runtime = runtime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<String> getGenreSet() {
        return genreSet;
    }

    public void setGenreSet(Set<String> genreSet) {
        this.genreSet = genreSet;
    }

    public String getOriginalLanguage() {
        return originalLanguage;
    }

    public void setOriginalLanguage(String originalLanguage) {
        this.originalLanguage = originalLanguage;
    }

    public String getOriginalTitle() {
        return originalTitle;
    }

    public void setOriginalTitle(String originalTitle) {
        this.originalTitle = originalTitle;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Integer getRuntime() {
        return runtime;
    }

    public void setRuntime(Integer runtime) {
        this.runtime = runtime;
    }
}
