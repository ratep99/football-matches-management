package com.example.sport_event_backend.mapper;

import com.example.sport_event_backend.dto.CardDTO;
import com.example.sport_event_backend.entity.Card;

import java.util.function.Function;

public class CardDTOMapper implements Function<Card, CardDTO> {
    @Override
    public CardDTO apply(Card card) {
        return new CardDTO(
                card.getCardId(),
                card.getType(),
                card.getResult().getResultId(),
                card.getPlayer().getPlayerId(),
                card.getPlayer().getName(),
                card.getTime(),
                card.getReason(),
                card.getTeam().getTeamId());
    }
}
