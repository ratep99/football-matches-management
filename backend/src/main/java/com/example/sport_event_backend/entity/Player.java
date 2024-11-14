package com.example.sport_event_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "player")
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playerId;

    private String name;

    @ManyToOne
    @JoinColumn(name = "_teamId")
    private Team team;
}