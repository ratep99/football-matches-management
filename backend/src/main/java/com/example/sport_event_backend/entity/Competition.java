package com.example.sport_event_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "competition")
public class Competition {
    @Id
    private String competitionId;

    private String name;
}