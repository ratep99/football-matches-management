package com.example.sport_event_backend.repository;

import com.example.sport_event_backend.entity.Stadium;
import com.example.sport_event_backend.projection.StadiumProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StadiumRepository extends JpaRepository<Stadium, Long> {
    @Query("SELECT s.id AS id, s.name as name FROM Stadium s")
    List<StadiumProjection> findAllStadiumsForDropdown();
}
