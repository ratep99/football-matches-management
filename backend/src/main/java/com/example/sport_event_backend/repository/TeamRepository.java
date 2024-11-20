package com.example.sport_event_backend.repository;

import com.example.sport_event_backend.entity.Team;
import com.example.sport_event_backend.projection.TeamProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    @Query("SELECT t.id AS id, t.name AS name FROM Team t")
    List<TeamProjection> findAllTeamsForDropdown();
}