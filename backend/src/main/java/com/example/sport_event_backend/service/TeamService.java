package com.example.sport_event_backend.service;
import com.example.sport_event_backend.projection.TeamProjection;
import com.example.sport_event_backend.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {

    private final TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public List<TeamProjection> getAllTeamsForDropdown() {
        return teamRepository.findAllTeamsForDropdown();
    }
}
