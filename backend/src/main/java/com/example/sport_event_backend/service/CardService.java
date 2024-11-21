package com.example.sport_event_backend.service;

import com.example.sport_event_backend.dto.CardDTO;
import com.example.sport_event_backend.entity.Card;
import com.example.sport_event_backend.entity.Result;
import com.example.sport_event_backend.repository.CardRepository;
import com.example.sport_event_backend.repository.PlayerRepository;
import com.example.sport_event_backend.repository.ResultRepository;
import com.example.sport_event_backend.repository.TeamRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CardService {


    private final CardRepository cardRepository;
    private final ResultRepository resultRepository;
    private final PlayerRepository playerRepository;
    private final TeamRepository teamRepository;

    public CardService(CardRepository cardRepository, ResultRepository resultRepository, PlayerRepository playerRepository, TeamRepository teamRepository) {
        this.cardRepository = cardRepository;
        this.resultRepository = resultRepository;
        this.playerRepository = playerRepository;
        this.teamRepository = teamRepository;
    }

    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }

    public Optional<Card> getCardById(Long id) {
        return cardRepository.findById(id);
    }

    public List<Card> getCardsByTeamId(Long teamId) {
        return cardRepository.findByTeam_TeamId(teamId);
    }

    public Card addCard(CardDTO card) {

        // Fetch all existing cards for this player and result
        Optional<Card> existingCards = cardRepository.findByPlayer_PlayerIdAndResult_ResultIdAndType(card.playerId(), card.resultId(),card.type());
        if (existingCards.stream().anyMatch(c -> c.getType() == Card.CardType.RED)) {
            throw new IllegalStateException("Cannot add a card after a straight red card.");
        }

        // Check if there's a previous yellow card for the player
        Optional<Card> previousYellow = existingCards.stream()
                .filter(c -> c.getType() == Card.CardType.YELLOW)
                .findFirst();

        // Prevent adding a yellow card before an existing one based on time
        if (previousYellow.isPresent() && card.time() < previousYellow.get().getTime()) {
            throw new IllegalArgumentException("New yellow card cannot be earlier than the existing yellow card.");
        }

        Card newCard = new Card();
        newCard.setResult(resultRepository.findById(card.resultId())
                .orElseThrow(()-> new EntityNotFoundException("Result not found")));
        newCard.setPlayer(playerRepository.findById(card.playerId())
                .orElseThrow(() -> new EntityNotFoundException("Player not found")));
        newCard.setTeam(teamRepository.findById(card.teamId())
                .orElseThrow(() -> new EntityNotFoundException("Team not found")));
        newCard.setTime(card.time());
        newCard.setReason(card.reason());

        if (card.type() == Card.CardType.YELLOW) {
            if (previousYellow.isPresent()) {
                newCard.setType(Card.CardType.SECOND_YELLOW);
            } else {
                newCard.setType(Card.CardType.YELLOW);
            }
        } else {
            newCard.setType(card.type());
        }

        return cardRepository.save(newCard);
    }

    public void deleteCard(Long cardId) {
        Card cardToDelete = cardRepository.findById(cardId)
                .orElseThrow(() -> new EntityNotFoundException("Card not found"));

        Result result = cardToDelete.getResult();

        // If deleting a yellow card, check if there's also a second yellow card
        if (cardToDelete.getType() == Card.CardType.YELLOW) {
            Optional<Card> secondYellowCard = cardRepository.findByPlayer_PlayerIdAndResult_ResultIdAndType(
                    cardToDelete.getPlayer().getPlayerId(), result.getResultId(), Card.CardType.SECOND_YELLOW);

            if (secondYellowCard.isPresent()) {
                // If deleting the first yellow card, downgrade the second yellow card to the first yellow card
                Card downgradeCard = secondYellowCard.get();
                downgradeCard.setType(Card.CardType.YELLOW);
                cardRepository.save(downgradeCard);
            }
        }
        // Proceed with deletion of the original card
        cardRepository.delete(cardToDelete);
    }

}
