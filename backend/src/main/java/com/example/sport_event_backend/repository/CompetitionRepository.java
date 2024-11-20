package com.example.sport_event_backend.repository;

import com.example.sport_event_backend.entity.Competition;
import com.example.sport_event_backend.projection.CompetitionProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompetitionRepository extends JpaRepository<Competition, String> {
    @Query("SELECT c.competitionId AS competitionId, c.name AS name FROM Competition c")
    List<CompetitionProjection> findAllCompetitionsForDropdown();
}
