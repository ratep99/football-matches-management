package com.example.sport_event_backend.service;

import com.example.sport_event_backend.dto.GoalDTO;
import com.example.sport_event_backend.entity.Card;
import com.example.sport_event_backend.entity.Goal;
import com.example.sport_event_backend.entity.Result;
import com.example.sport_event_backend.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.util.List;
import java.util.Optional;

@Service
public class GoalService {

    private final GoalRepository goalRepository;
    private final ResultRepository resultRepository;
    private final CardRepository cardRepository;
    private final PlayerRepository playerRepository;
    private final TeamRepository teamRepository;

    public GoalService(GoalRepository goalRepository, ResultRepository resultRepository, CardRepository cardRepository, PlayerRepository playerRepository, TeamRepository teamRepository) {
        this.goalRepository = goalRepository;
        this.resultRepository = resultRepository;
        this.cardRepository = cardRepository;
        this.playerRepository = playerRepository;
        this.teamRepository = teamRepository;
    }

    public List<Goal> getAllGoals() {
        return goalRepository.findAll();
    }

    public Optional<Goal> getGoalById(Long id) {
        return goalRepository.findById(id);
    }

    public List<Goal> getGoalsByTeamId(Long teamId) {
        return goalRepository.findByTeam_TeamId(teamId);
    }

    public Goal addGoal(GoalDTO goalDTO) {
        Result result = resultRepository.findById(goalDTO.resultId())
                .orElseThrow(() -> new EntityNotFoundException("Result not found"));

        validateGoalEligibility(goalDTO);

        Goal newGoal = new Goal();
        newGoal.setResult(result);
        newGoal.setPlayer(playerRepository.findById(goalDTO.playerId())
                .orElseThrow(() -> new EntityNotFoundException("Player not found")));
        newGoal.setTime(goalDTO.time());
        newGoal.setTeam(teamRepository.findById(goalDTO.teamId()).
                orElseThrow(() -> new EntityNotFoundException("Team not found")));

        // Update the result goals based on the team that scored
        if (goalDTO.teamId().equals(result.getEvent().getHomeTeam().getTeamId())) {
            result.setHomeGoals(result.getHomeGoals() != null ? result.getHomeGoals() + 1 : 1);
        } else if (goalDTO.teamId().equals(result.getEvent().getAwayTeam().getTeamId())) {
            result.setAwayGoals(result.getAwayGoals() != null ? result.getAwayGoals() + 1 : 1);
        } else {
            throw new IllegalArgumentException("Team ID does not match either the home or away team of the event.");
        }
        resultRepository.save(result);
        return goalRepository.save(newGoal);
    }
    public void validateGoalEligibility(GoalDTO goalDTO) {
        Integer cardTime = null;
        Optional<Card> secondYellowCard = cardRepository.findByPlayer_PlayerIdAndResult_ResultIdAndType(
                goalDTO.playerId(), goalDTO.resultId(), Card.CardType.SECOND_YELLOW);

        if (secondYellowCard.isPresent()) {
            cardTime = secondYellowCard.get().getTime();
        } else {
            Optional<Card> redCard = cardRepository.findByPlayer_PlayerIdAndResult_ResultIdAndType(
                    goalDTO.playerId(), goalDTO.resultId(), Card.CardType.RED);
            if (redCard.isPresent()) {
                cardTime = redCard.get().getTime();
            }
        }
        if (cardTime != null) {
            if (goalDTO.time() > cardTime) {
                throw new IllegalArgumentException("Goal time cannot be after the card time.");
            }
        }
    }

    public void deleteGoal(Long goalId) {
        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new EntityNotFoundException("Goal not found"));

        // Fetch the related result entity
        Result result = goal.getResult();
        if (result == null) {
            throw new IllegalArgumentException("Result not found for the given goal.");
        }

        // Update the result's goals count based on the team
        if (goal.getTeamId().equals(result.getEvent().getHomeTeam().getTeamId())) {
            if (result.getHomeGoals() != null && result.getHomeGoals() > 0) {
                result.setHomeGoals(result.getHomeGoals() - 1);
            } else {
                throw new IllegalArgumentException("Cannot delete goal as home goals count is already zero.");
            }
        } else if (goal.getTeamId().equals(result.getEvent().getAwayTeam().getTeamId())) {
            if (result.getAwayGoals() != null && result.getAwayGoals() > 0) {
                result.setAwayGoals(result.getAwayGoals() - 1);
            } else {
                throw new IllegalArgumentException("Cannot delete goal as away goals count is already zero.");
            }
        } else {
            throw new IllegalArgumentException("Team ID does not match either the home or away team of the event.");
        }

        // Save the updated result
        resultRepository.save(result);

        // Delete the goal entity
        goalRepository.delete(goal);
    }


}
