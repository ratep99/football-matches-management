package com.example.sport_event_backend.service;

import com.example.sport_event_backend.dto.EventCardDTO;
import com.example.sport_event_backend.entity.Event;
import com.example.sport_event_backend.mapper.EventCardDTOMapper;
import com.example.sport_event_backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    private final EventCardDTOMapper eventCardDTOMapper;
    private final EventRepository eventRepository;


    public EventService(EventRepository eventRepository, EventCardDTOMapper eventCardDTOMapper) {
        this.eventRepository = eventRepository;
        this.eventCardDTOMapper = eventCardDTOMapper;
    }
    public List<EventCardDTO> findAllEvents() {
        List<Event> eventsTest = eventRepository.findAll();
        return eventsTest.stream().map(eventCardDTOMapper).toList();
    }
    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    public List<Event> findWithLimit(int limit) {
        return eventRepository.findWithLimit(limit);
    }

    public Event findById(Long eventId) {
        return eventRepository.findById(eventId).orElse(null);
    }

    public Event save(Event event) {
        return eventRepository.save(event);
    }

    public Event update(Long eventId, EventCardDTO updatedEvent) {
        Event event = eventRepository.findById(eventId).orElse(null);
        if (event!=null) {
            event.setSeason(updatedEvent.season());
            event.setCompetition(updatedEvent.competition());
            event.setDateVenue(updatedEvent.date());
            event.setTimeVenueUtc(updatedEvent.time());
            event.setHomeTeam(updatedEvent.homeTeam());
            event.setAwayTeam(updatedEvent.awayTeam());
            return eventRepository.save(event);
        }
        return null;
    }

    public void deleteById(Long eventId) {
        eventRepository.deleteById(eventId);
    }
}
