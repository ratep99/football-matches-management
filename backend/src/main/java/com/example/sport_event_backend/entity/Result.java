package com.example.sport_event_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "result")
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resultId;

    @OneToOne
    @JoinColumn(name = "_eventId", unique = true)
    private Event event;

    private Integer homeGoals;

    private Integer awayGoals;

    private String winner;

    private String message;
}