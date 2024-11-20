package com.example.sport_event_backend.service;

import com.example.sport_event_backend.projection.StageProjection;
import com.example.sport_event_backend.repository.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StageService {
    private final StageRepository stageRepository;

    @Autowired
    public StageService(StageRepository stageRepository) {
        this.stageRepository = stageRepository;
    }

    public List<StageProjection> getAllStagesForDropdown() {
        return stageRepository.findAllStagesForDropdown();
    }
}
