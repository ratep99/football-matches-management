package com.example.sport_event_backend.service;

import com.example.sport_event_backend.projection.CompetitionProjection;
import com.example.sport_event_backend.repository.CompetitionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompetitionService {
    @Autowired
    private final CompetitionRepository competitionRepository;

    public  CompetitionService(CompetitionRepository competitionRepository){
        this.competitionRepository = competitionRepository;

    }
    public List<CompetitionProjection> getAllCompetitionsForDropdown(){
        return competitionRepository.findAllCompetitionsForDropdown();
    }
}
