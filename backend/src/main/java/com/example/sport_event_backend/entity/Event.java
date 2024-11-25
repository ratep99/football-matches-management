package com.example.sport_event_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Entity
@Table(name = "event")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;

    private Integer season;

    private String status;

    @Column(name = "timeVenueUtc")
    private LocalTime timeVenueUtc;

    @Column(name = "dateVenue")
    private LocalDate dateVenue;

    @ManyToOne
    @JoinColumn(name = "_stadiumId")
    private Stadium stadium;

    @ManyToOne
    @JoinColumn(name = "_homeTeamId")
    private Team homeTeam;

    @ManyToOne
    @JoinColumn(name = "_awayTeamId")
    private Team awayTeam;

    @ManyToOne
    @JoinColumn(name = "_competitionId")
    private Competition competition;

    @ManyToOne
    @JoinColumn(name = "_stageId")
    private Stage stage;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "_resultId")
    private Result result;

}
