package com.example.sport_event_backend.service;

import com.example.sport_event_backend.entity.Event;
import com.example.sport_event_backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    public Event findById(Long eventId) {
        return eventRepository.findById(eventId).orElse(null);
    }

    public Event save(Event event) {
        return eventRepository.save(event);
    }

    public Event update(Long eventId, Event updatedEvent) {
        if (eventRepository.existsById(eventId)) {
            updatedEvent.setEventId(eventId);
            return eventRepository.save(updatedEvent);
        }
        return null;
    }

    public void deleteById(Long eventId) {
        eventRepository.deleteById(eventId);
    }
}
