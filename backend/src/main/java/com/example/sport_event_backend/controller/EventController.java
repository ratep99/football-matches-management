package com.example.sport_event_backend.controller;

import com.example.sport_event_backend.dto.EventCardDTO;
import com.example.sport_event_backend.entity.Event;
import com.example.sport_event_backend.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {
    @Autowired
    private EventService eventService;

    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.findAll();
    }

    @GetMapping("/dto")
    public List<EventCardDTO> getAllDTOEvents() {
        return eventService.findAllEvents();
    }

    @GetMapping("/limited")
    public List<Event> findWithLimit(@RequestParam(defaultValue = "3")int limit) {
        return eventService.findWithLimit(limit);
    }

    @GetMapping("/{id}")
    public Event getEventById(@PathVariable Long id) {
        return eventService.findById(id);
    }

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventService.save(event);
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventService.deleteById(id);
    }
}