package com.example.sport_event_backend.dto;

import com.example.sport_event_backend.entity.Card;

public record CardDTO(
        Long cardId,
        Card.CardType type,
        Long resultId,
        Long playerId,
        String playerName,
        Integer time,
        String reason,
        Long teamId
) {
}
