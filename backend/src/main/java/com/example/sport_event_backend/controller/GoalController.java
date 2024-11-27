package com.example.sport_event_backend.controller;

import com.example.sport_event_backend.dto.GoalDTO;
import com.example.sport_event_backend.entity.Goal;
import com.example.sport_event_backend.service.GoalService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @GetMapping
    public ResponseEntity<List<Goal>> getAllGoals() {
        return ResponseEntity.ok(goalService.getAllGoals());
    }

    // Get a goal by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Goal> getGoalById(@PathVariable Long id) {
        Optional<Goal> goal = goalService.getGoalById(id);
        return goal.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get goals by team ID
    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<Goal>> getGoalsByTeamId(@PathVariable Long teamId) {
        List<Goal> goals = goalService.getGoalsByTeamId(teamId);
        return ResponseEntity.ok(goals);
    }

    // Create a new goal
    @PostMapping
    public ResponseEntity<Goal> addGoal(@Valid @RequestBody GoalDTO goalDTO) {
        Goal createdGoal = goalService.addGoal(goalDTO);
        return ResponseEntity.ok(createdGoal);
    }

    // Delete a goal by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long id) {
        if (!goalService.getGoalById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        goalService.deleteGoal(id);
        return ResponseEntity.noContent().build();
    }
}
