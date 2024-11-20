package com.example.sport_event_backend.repository;

import com.example.sport_event_backend.entity.Stage;
import com.example.sport_event_backend.projection.StageProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StageRepository extends JpaRepository<Stage, String> {
    @Query("SELECT s.stageId AS stageId, s.name AS name FROM Stage s")
    List<StageProjection> findAllStagesForDropdown();
}