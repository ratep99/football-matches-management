package com.example.sport_event_backend.service;

import com.example.sport_event_backend.projection.PlayerProjection;
import com.example.sport_event_backend.entity.Player;
import com.example.sport_event_backend.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<PlayerProjection> getPlayerNamesByTeamId(Long teamId) {
        return playerRepository.findPlayersByTeamId(teamId);
    }

    public Player getPlayerById(Long id) {
        return playerRepository.findById(id).get();
    }

    public Player createPlayer(Player player) {
        return playerRepository.save(player);
    }

    public Player updatePlayer(Long id, Player playerDetails) {
        Player player = getPlayerById(id);
        player.setName(playerDetails.getName());
        player.setTeam(playerDetails.getTeam());
        return playerRepository.save(player);
    }

    public void deletePlayer(Long id) {
        Player player = getPlayerById(id);
        playerRepository.delete(player);
    }
}
