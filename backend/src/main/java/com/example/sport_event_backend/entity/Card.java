package com.example.sport_event_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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

    @Enumerated(EnumType.STRING)
    @JsonIgnore
    @Column(name = "type")
    private CardType type;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "_resultId")
    private Result result;

    @OneToOne
    @JoinColumn(name = "_playerId")
    private Player player;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "_teamId")
    private Team team;

    @JsonProperty("teamId")
    public Long getTeamId() {
        return team != null ? team.getTeamId() : null;
    }

    private Integer time;

    private String reason;



    public enum CardType {
        YELLOW, SECOND_YELLOW, RED;
    }
}