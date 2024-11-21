package com.example.sport_event_backend.service;

import com.example.sport_event_backend.projection.StadiumProjection;
import com.example.sport_event_backend.repository.EventRepository;
import com.example.sport_event_backend.repository.StadiumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class StadiumService {

    private final StadiumRepository stadiumRepository;

    public StadiumService(StadiumRepository stadiumRepository) {
        this.stadiumRepository = stadiumRepository;
    }

    public List<StadiumProjection> getAllStadiumsForDropdown(){
        return stadiumRepository.findAllStadiumsForDropdown();
    }
}
