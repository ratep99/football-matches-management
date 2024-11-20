package com.example.sport_event_backend.controller;


import com.example.sport_event_backend.projection.CompetitionProjection;
import com.example.sport_event_backend.service.CompetitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/competitions")
public class CompetitionController {

    private final CompetitionService competitionService;

    @Autowired
    public CompetitionController(CompetitionService competitionService) {
        this.competitionService = competitionService;
    }

    @GetMapping("/dropdown")
    public ResponseEntity<List<CompetitionProjection>> getAllCompetitionsForDropdown() {
        List<CompetitionProjection> competitions = competitionService.getAllCompetitionsForDropdown();
        return new ResponseEntity<>(competitions, HttpStatus.OK);
    }
}
