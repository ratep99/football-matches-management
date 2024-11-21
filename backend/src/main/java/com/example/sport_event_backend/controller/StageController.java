package com.example.sport_event_backend.controller;

import com.example.sport_event_backend.projection.StageProjection;
import com.example.sport_event_backend.service.StageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/stages")
public class StageController {

    private final StageService stageService;

    public StageController(StageService stageService) {
        this.stageService = stageService;
    }

    @GetMapping("/dropdown")
    public ResponseEntity<List<StageProjection>> getAllStagesForDropdown() {
        List<StageProjection> stages = stageService.getAllStagesForDropdown();
        return new ResponseEntity<>(stages, HttpStatus.OK);
    }
}
