package com.gamebox.gb.config;

import com.gamebox.gb.datasource.repositories.GameRepository;
import com.gamebox.gb.domain.entities.Game;
import com.gamebox.gb.domain.enums.Genre;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

// executa o código automaticamente quando a aplicação sobe

@Component
public class DataSeeder implements CommandLineRunner {

    private final GameRepository gameRepository;

    public DataSeeder(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @Override
    public void run(String... args) {

        if (gameRepository.count() > 0) {
            return;
        }

        gameRepository.saveAll(List.of(

                createGame(
                        "The Last of Us Part II Remastered",
                        List.of(Genre.ACTION, Genre.ADVENTURE),
                        "Jogo de ação e aventura pós-apocalíptico.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2531310/library_600x900.jpg",
                        LocalDate.of(2020, 6, 19)
                ),

                createGame(
                        "Red Dead Redemption 2",
                        List.of(Genre.ACTION, Genre.ADVENTURE),
                        "Faroeste em mundo aberto da Rockstar.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1174180/library_600x900.jpg",
                        LocalDate.of(2018, 10, 26)
                ),

                createGame(
                        "God of War Ragnarök",
                        List.of(Genre.ACTION, Genre.ADVENTURE),
                        "Kratos e Atreus enfrentam o Ragnarök.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2322010/library_600x900.jpg",
                        LocalDate.of(2024, 9, 19)
                ),

                createGame(
                        "Hollow Knight",
                        List.of(Genre.ADVENTURE, Genre.SURVIVAL),
                        "Metroidvania indie em Hallownest.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/367520/library_600x900.jpg",
                        LocalDate.of(2017, 2, 24)
                ),

                createGame(
                        "Celeste",
                        List.of(Genre.ADVENTURE, Genre.CASUAL),
                        "Plataforma indie focada em precisão.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/504230/library_600x900.jpg",
                        LocalDate.of(2018, 1, 25)
                ),

                createGame(
                        "Resident Evil 4 Remake",
                        List.of(Genre.ACTION, Genre.HORROR),
                        "Remake moderno do clássico survival horror.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2050650/library_600x900.jpg",
                        LocalDate.of(2023, 3, 24)
                ),

                createGame(
                        "Forza Horizon 5",
                        List.of(Genre.RACING, Genre.SPORTS),
                        "Jogo de corrida em mundo aberto no México.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1551360/library_600x900.jpg",
                        LocalDate.of(2021, 11, 9)
                ),

                createGame(
                        "Street Fighter 6",
                        List.of(Genre.FIGHTING, Genre.ACTION),
                        "Novo capítulo da franquia Street Fighter.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1364780/library_600x900.jpg",
                        LocalDate.of(2023, 6, 2)
                ),

                createGame(
                        "Baldur's Gate 3",
                        List.of(Genre.RPG, Genre.ADVENTURE),
                        "RPG baseado em Dungeons & Dragons.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1086940/library_600x900.jpg",
                        LocalDate.of(2023, 8, 3)
                ),

                createGame(
                        "Ori and the Will of the Wisps",
                        List.of(Genre.ADVENTURE, Genre.FAMILY),
                        "Aventura de plataforma com visual artístico.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1057090/library_600x900.jpg",
                        LocalDate.of(2020, 3, 11)
                ),

                createGame(
                        "Cyberpunk 2077",
                        List.of(Genre.RPG, Genre.ACTION),
                        "RPG futurista em Night City.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1091500/library_600x900.jpg",
                        LocalDate.of(2020, 12, 10)
                ),

                createGame(
                        "Elden Ring",
                        List.of(Genre.RPG, Genre.ACTION),
                        "RPG de ação da FromSoftware.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1245620/library_600x900.jpg",
                        LocalDate.of(2022, 2, 25)
                ),

                createGame(
                        "Stardew Valley",
                        List.of(Genre.CASUAL, Genre.FAMILY),
                        "Simulador indie de fazenda.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/413150/library_600x900.jpg",
                        LocalDate.of(2016, 2, 26)
                ),

                createGame(
                        "Hades",
                        List.of(Genre.ACTION, Genre.RPG),
                        "Roguelike indie inspirado na mitologia grega.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1145360/library_600x900.jpg",
                        LocalDate.of(2020, 9, 17)
                ),

                createGame(
                        "Undertale",
                        List.of(Genre.RPG, Genre.CASUAL),
                        "RPG indie com escolhas morais.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/391540/library_600x900.jpg",
                        LocalDate.of(2015, 9, 15)
                ),

                createGame(
                        "The Witcher 3",
                        List.of(Genre.RPG, Genre.ADVENTURE),
                        "RPG em mundo aberto estrelando Geralt.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/292030/library_600x900.jpg",
                        LocalDate.of(2015, 5, 19)
                ),

                createGame(
                        "Dead by Daylight",
                        List.of(Genre.HORROR, Genre.SURVIVAL),
                        "Multiplayer de horror assimétrico.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/381210/library_600x900.jpg",
                        LocalDate.of(2016, 6, 14)
                ),

                createGame(
                        "It Takes Two",
                        List.of(Genre.ADVENTURE, Genre.FAMILY),
                        "Aventura cooperativa premiada.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1426210/library_600x900.jpg",
                        LocalDate.of(2021, 3, 26)
                ),

                createGame(
                        "Terraria",
                        List.of(Genre.SURVIVAL, Genre.ADVENTURE),
                        "Sandbox 2D de exploração e crafting.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/105600/library_600x900.jpg",
                        LocalDate.of(2011, 5, 16)
                ),

                createGame(
                        "EA Sports FC 25",
                        List.of(Genre.SPORTS),
                        "Simulador moderno de futebol.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2669320/library_600x900.jpg",
                        LocalDate.of(2024, 9, 20)
                )
        ));
    }

    private Game createGame(
            String name,
            List<Genre> genres,
            String description,
            String photo,
            LocalDate releaseDate
    ) {

        Game game = new Game();

        String bannerPhoto = photo.replace(
                "library_600x900.jpg",
                "header.jpg"
        );

        game.setGameName(name);
        game.setGenres(genres);
        game.setDescription(description);
        game.setGamePhoto(photo);
        game.setBannerPhoto(bannerPhoto);
        game.setReleaseDate(releaseDate);

        return game;
    }
}