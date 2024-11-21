package com.example.sport_event_backend.controller;

import com.example.sport_event_backend.projection.StadiumProjection;
import com.example.sport_event_backend.service.StadiumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/stadiums")
public class StadiumController {

    private final StadiumService stadiumService;

    public StadiumController(StadiumService stadiumService) {
        this.stadiumService = stadiumService;
    }

    // Endpoint to get all stadiums for dropdown options
    @GetMapping("/dropdown")
    public ResponseEntity<List<StadiumProjection>> getAllStadiumsForDropdown() {
        List<StadiumProjection> stadiums = stadiumService.getAllStadiumsForDropdown();
        return new ResponseEntity<>(stadiums, HttpStatus.OK);
    }
}
