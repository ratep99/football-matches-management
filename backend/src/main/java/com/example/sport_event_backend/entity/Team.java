package com.example.sport_event_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "team")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teamId;

    private String name;

    private String logoUrl;

    @Column(name = "officialName")
    private String officialName;

    private String slug;

    @Column(length = 3)
    private String abbreviation;

    @Column(length = 3)
    private String teamCountryCode;

    private String stagePosition;
}