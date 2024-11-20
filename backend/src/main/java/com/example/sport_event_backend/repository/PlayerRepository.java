package com.example.sport_event_backend.repository;

import com.example.sport_event_backend.entity.Player;
import com.example.sport_event_backend.projection.PlayerProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    @Query("SELECT p.playerId AS playerId, p.name AS name FROM Player p WHERE p.team.id = :teamId")
    List<PlayerProjection> findPlayersByTeamId(Long teamId);
}
