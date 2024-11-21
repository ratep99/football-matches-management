package com.example.sport_event_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "goal")
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goalId;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "_resultId")
    private Result result;

    @ManyToOne
    @NotNull(message = "Player is required.")
    @JoinColumn(name = "_playerId")
    private Player player;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "_teamId")
    private Team team;

    @NotNull(message = "Time is required.")
    @Min(value = 0, message = "Time must be a positive value.")
    @Max(value = 90, message = "Time must be a value between 0 and 90.")
    @Column(name = "time")
    private Integer time;

    @JsonProperty("teamId")
    public Long getTeamId() {
        return team != null ? team.getTeamId() : null;
    }
}
