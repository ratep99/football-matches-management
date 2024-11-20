package com.example.sport_event_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonBackReference
    @JoinColumn(name = "_resultId")
    private Result result;

    @ManyToOne
    @JoinColumn(name = "_playerId")
    private Player player;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "_teamId")
    private Team team;

    @Column(name = "time")
    private Integer time;

    @JsonProperty("teamId")
    public Long getTeamId() {
        return team != null ? team.getTeamId() : null;
    }

//    @JsonIgnore
//    public Team getTeam() {
//        return team;
//    }
}
