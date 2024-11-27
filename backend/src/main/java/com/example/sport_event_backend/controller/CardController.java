package com.example.sport_event_backend.controller;

import com.example.sport_event_backend.dto.CardDTO;
import com.example.sport_event_backend.entity.Card;
import com.example.sport_event_backend.service.CardService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping
    public ResponseEntity<List<Card>> getAllCards() {
        return ResponseEntity.ok(cardService.getAllCards());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Card> getCardById(@PathVariable Long id) {
        Optional<Card> card = cardService.getCardById(id);
        return card.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<Card>> getCardsByTeamId(@PathVariable Long teamId) {
        List<Card> cards = cardService.getCardsByTeamId(teamId);
        return ResponseEntity.ok(cards);
    }

    @PostMapping
    public ResponseEntity<Card> createCard(@RequestBody CardDTO card) {
        return ResponseEntity.ok(cardService.addCard(card));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCard(@PathVariable Long id) {
        if (cardService.getCardById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        cardService.deleteCard(id);
        return ResponseEntity.noContent().build();
    }
}
