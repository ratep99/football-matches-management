package com.example.sport_event_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "card")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardId;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Card type is required.")
    @Column(name = "type")
    private CardType type;

    @ManyToOne
    @JsonIgnore // Prevents serialization of the entire Result object
    @JoinColumn(name = "_resultId")
    private Result result;

    @OneToOne
    @NotNull(message = "Player is required.")
    @JoinColumn(name = "_playerId")
    private Player player;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "_teamId")
    private Team team;

    @NotNull(message = "Time is required.")
    @Min(value = 0, message = "Time must be a positive value.")
    private Integer time;

    @NotNull(message = "Reason is required.")
    private String reason;

    // Custom getter to expose resultId instead of the entire Result object
    @JsonProperty("resultId")
    public Long getResultId() {
        return result != null ? result.getResultId() : null;
    }

    // Custom getter for exposing teamId to avoid serializing the whole Team object
    @JsonProperty("teamId")
    public Long getTeamId() {
        return team != null ? team.getTeamId() : null;
    }

    public enum CardType {
        YELLOW, SECOND_YELLOW, RED;
    }
}
