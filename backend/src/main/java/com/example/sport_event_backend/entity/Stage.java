package com.example.sport_event_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "stage")
public class Stage {
    @Id
    private String stageId;

    private String name;

    private Integer ordering;
}
