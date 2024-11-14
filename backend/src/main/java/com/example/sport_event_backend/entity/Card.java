package com.example.sport_event_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Time;

@Data
@Entity
@Table(name = "card")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardId;

    private String type;

    @ManyToOne
    @JoinColumn(name = "_resultId")
    private Result result;

    @ManyToOne
    @JoinColumn(name = "_playerId")
    private Player player;

    private Time timestamp;
}