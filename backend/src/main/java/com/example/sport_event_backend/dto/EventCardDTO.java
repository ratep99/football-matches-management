package com.example.sport_event_backend.dto;

import com.example.sport_event_backend.entity.Competition;
import com.example.sport_event_backend.entity.Stadium;
import com.example.sport_event_backend.entity.Stage;
import com.example.sport_event_backend.entity.Team;

import java.sql.Date;
import java.sql.Time;

public record EventCardDTO(
    Long eventId,
    Integer season,
    Time time,
    Date date,
    Team homeTeam,
    Team awayTeam,
    Integer homeTeamGoals,
    Integer awayTeamGoals,
    Stadium stadium,
    Stage stage,
    Competition competition,
    String status
) {
}
