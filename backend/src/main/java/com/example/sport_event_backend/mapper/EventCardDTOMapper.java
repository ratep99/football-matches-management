package com.example.sport_event_backend.mapper;

import com.example.sport_event_backend.dto.EventCardDTO;
import com.example.sport_event_backend.entity.Event;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class EventCardDTOMapper implements Function<Event, EventCardDTO> {

    @Override
    public EventCardDTO apply(Event event) {
        return new EventCardDTO(
                event.getEventId(),
                event.getSeason(),
                event.getTimeVenueUtc(),
                event.getDateVenue(),
                event.getHomeTeam(),
                event.getAwayTeam(),
                event.getResult() != null ? event.getResult().getHomeGoals() : null,
                event.getResult() != null ? event.getResult().getAwayGoals() : null,
                event.getStadium(),
                event.getStage(),
                event.getCompetition(),
                event.getStatus()
        );
    }
}
