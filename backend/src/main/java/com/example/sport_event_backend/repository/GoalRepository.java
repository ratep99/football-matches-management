package com.example.sport_event_backend.repository;

import com.example.sport_event_backend.entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
    List<Goal> findByTeam_TeamId(Long teamId);
}
