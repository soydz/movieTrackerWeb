package com.soydz.persistence.repository;

import com.soydz.persistence.entity.UserMovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMovieRepository extends JpaRepository<UserMovieEntity, Long> {
    boolean existsByUser_IdAndMovie_Id(Long user, Long movie);
    List<UserMovieEntity> findByUserId(Long id);
}
