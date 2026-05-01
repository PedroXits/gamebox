package com.gamebox.gb.services;

import com.gamebox.gb.datasource.repositories.GameRepository;
import com.gamebox.gb.datasource.repositories.PlayedRepository;
import com.gamebox.gb.datasource.repositories.ProfileRepository;
import com.gamebox.gb.domain.dtos.played.CreatePlayedRequest;
import com.gamebox.gb.domain.dtos.played.PlayedResponse;
import com.gamebox.gb.domain.entities.Game;
import com.gamebox.gb.domain.entities.Played;
import com.gamebox.gb.domain.entities.Profile;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayedService {

    private final PlayedRepository playedRepository;
    private final ProfileRepository profileRepository;
    private final GameRepository gameRepository;

    public PlayedService(PlayedRepository playedRepository,
                         ProfileRepository profileRepository,
                         GameRepository gameRepository) {
        this.playedRepository = playedRepository;
        this.profileRepository = profileRepository;
        this.gameRepository = gameRepository;
    }

    public PlayedResponse createPlayed(CreatePlayedRequest request) {

        Long profileId = request.profileId();
        Long gameId = request.gameId();

        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Perfil não encontrado."));

        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Jogo não encontrado."));

        if(playedRepository.existsByProfileIdAndGameId(profileId, gameId)) {
            throw new RuntimeException("Esse jogo já foi marcado como jogado.");
        }

        Played played = new Played();

        played.setGame(game);
        played.setProfile(profile);

        Played savedPlayed = playedRepository.save(played);

        return new PlayedResponse(
                savedPlayed.getId(),
                savedPlayed.getProfile().getId(),
                savedPlayed.getProfile().getProfileName(),
                savedPlayed.getGame().getId(),
                savedPlayed.getGame().getGameName(),
                savedPlayed.getCreatedAt()
        );
    }

    public List<PlayedResponse> findByProfileId(Long profileId) {

        profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Perfil não encontrado."));

        List<Played> playedList = playedRepository.findByProfileId(profileId);

        return playedList.stream()
                .map(p -> new PlayedResponse(
                        p.getId(),
                        p.getProfile().getId(),
                        p.getProfile().getProfileName(),
                        p.getGame().getId(),
                        p.getGame().getGameName(),
                        p.getCreatedAt()
                ))
                .toList();
    }

    public void deletePlayed(Long id) {

        Played played = playedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registro não encontrado."));

        playedRepository.delete(played);
    }

}
