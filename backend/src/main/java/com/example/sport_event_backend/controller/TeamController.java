package com.example.sport_event_backend.controller;


import com.example.sport_event_backend.projection.TeamProjection;
import com.example.sport_event_backend.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping("/dropdown")
    public ResponseEntity<List<TeamProjection>> getAllTeamsForDropdown() {
        List<TeamProjection> teams = teamService.getAllTeamsForDropdown();
        return new ResponseEntity<>(teams, HttpStatus.OK);
    }
}