package com.example.sport_event_backend.dto;

public record GoalDTO(
        Long goalId,
        Long resultId,
        Long playerId,
        String playerName,
        Integer time,
        Long teamId
) {
}
