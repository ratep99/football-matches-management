package com.example.sport_event_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "stadium")
public class Stadium {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stadiumId;

    private String name;

    private String location;

    private Integer capacity;

    @Column(name = "surfaceType")
    private String surfaceType;
}