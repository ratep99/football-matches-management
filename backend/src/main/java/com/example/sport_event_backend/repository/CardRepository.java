package com.example.sport_event_backend.repository;

import com.example.sport_event_backend.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
    List<Card> findByTeam_TeamId(Long teamId);

    Optional<Card> findByPlayer_PlayerIdAndResult_ResultIdAndType(Long playerId, Long resultId, Card.CardType type);
}
