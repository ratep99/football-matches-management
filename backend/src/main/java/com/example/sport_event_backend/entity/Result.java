package com.example.sport_event_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Entity
@Table(name = "result")
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resultId;

    private Integer homeGoals;

    private Integer awayGoals;

    @Enumerated(EnumType.STRING)
    @Column(name = "winner")
    private WinnerType winner;

    private String message;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "_eventId")
    private Event event;

    @OneToMany(mappedBy = "result", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Goal> goals;

    @OneToMany(mappedBy = "result", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Card> cards;

    @JsonProperty("yellowCards")
    public List<Card> getYellowCards() {
        return filterCardsByType(Card.CardType.YELLOW);
    }

    @JsonProperty("secondYellowCards")
    public List<Card> getSecondYellowCards() {
        return filterCardsByType(Card.CardType.SECOND_YELLOW);
    }

    @JsonProperty("directRedCards")
    public List<Card> getDirectRedCards() {
        return filterCardsByType(Card.CardType.RED);
    }

    /**
     * Filter the cards by a given type.
     *
     * @param type the card type
     * @return a list of cards of the given type
     */
    private List<Card> filterCardsByType(Card.CardType type) {
        if (cards == null) {
            return Collections.emptyList();
        }
        return cards.stream()
                .filter(card -> type.equals(card.getType()))
                .collect(Collectors.toList());
    }

    public enum WinnerType {
        HOME, AWAY;
    }
}
