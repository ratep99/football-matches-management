package com.example.sport_event_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Time;

@Data
@Entity
@Table(name = "goal")
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goalId;

    @ManyToOne
    @JoinColumn(name = "_resultId")
    private Result result;

    @ManyToOne
    @JoinColumn(name = "_playerId")
    private Player player;

    @ManyToOne
    @JoinColumn(name = "_teamId")
    private Team team;

    @Column(name = "timeScored")
    private Time timeScored;
}
