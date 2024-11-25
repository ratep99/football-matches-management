package com.example.sport_event_backend.dto;

import com.example.sport_event_backend.entity.Competition;
import com.example.sport_event_backend.entity.Stadium;
import com.example.sport_event_backend.entity.Stage;
import com.example.sport_event_backend.entity.Team;
import com.example.sport_event_backend.util.CustomLocalTimeDeserializer;
import com.example.sport_event_backend.util.CustomLocalTimeSerializer;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public record EventCardDTO(
    Long eventId,
    Integer season,
    @JsonSerialize(using = CustomLocalTimeSerializer.class)
    @JsonDeserialize(using = CustomLocalTimeDeserializer.class)
    LocalTime time,
    LocalDate date,
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
