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
                        "Life is Strange Remastered",
                        List.of(Genre.ADVENTURE),
                        "Aventura narrativa baseada em escolhas e viagem no tempo.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1265920/library_600x900.jpg",
                        LocalDate.of(2022, 2, 1)
                ),

                createGame(
                        "Lost Records: Bloom & Rage",
                        List.of(Genre.ADVENTURE),
                        "Aventura narrativa focada em amizade, mistério e escolhas.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1902960/library_600x900.jpg",
                        LocalDate.of(2025, 2, 18)
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
                        "Age of Empires IV: Anniversary Edition",
                        List.of(Genre.RPG),
                        "Experiência estratégica histórica com múltiplas civilizações.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1466860/library_600x900.jpg",
                        LocalDate.of(2022, 10, 25)
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
                        "Retrowave",
                        List.of(Genre.RACING, Genre.SPORTS),
                        "Corrida arcade inspirada na estética synthwave dos anos 80.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1239690/library_600x900.jpg",
                        LocalDate.of(2022, 5, 6)
                ),

                createGame(
                        "Hellblade: Senua's Sacrifice",
                        List.of(Genre.ACTION, Genre.ADVENTURE),
                        "Aventura psicológica inspirada na mitologia nórdica.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/414340/library_600x900.jpg",
                        LocalDate.of(2017, 8, 8)
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
                        "Stray",
                        List.of(Genre.ADVENTURE),
                        "Aventura de exploração protagonizada por um gato em uma cidade cyberpunk.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1332010/library_600x900.jpg",
                        LocalDate.of(2022, 7, 19)
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
                        "The Forest",
                        List.of(Genre.SURVIVAL, Genre.HORROR),
                        "Jogo de sobrevivência em uma floresta habitada por criaturas mutantes.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/242760/library_600x900.jpg",
                        LocalDate.of(2018, 4, 30)
                ),

                createGame(
                        "It Takes Two",
                        List.of(Genre.ADVENTURE, Genre.FAMILY),
                        "Aventura cooperativa premiada.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1426210/library_600x900.jpg",
                        LocalDate.of(2021, 3, 26)
                ),

                createGame(
                        "Riders Republic",
                        List.of(Genre.SPORTS, Genre.RACING),
                        "Jogo de esportes radicais com bicicleta, snowboard, esqui e wingsuit.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2290180/library_600x900.jpg",
                        LocalDate.of(2023, 6, 8)
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
                ),

                createGame(
                        "Little Nightmares",
                        List.of(Genre.HORROR, Genre.ADVENTURE),
                        "Aventura de terror com atmosfera sombria e puzzles.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/424840/library_600x900.jpg",
                        LocalDate.of(2017, 4, 28)
                ),

                createGame(
                        "Little Nightmares II",
                        List.of(Genre.HORROR, Genre.ADVENTURE),
                        "Continuação da aventura de terror com novos desafios e criaturas.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/860510/library_600x900.jpg",
                        LocalDate.of(2021, 2, 11)
                ),

                createGame(
                        "Sally Face",
                        List.of(Genre.HORROR, Genre.ADVENTURE),
                        "Aventura de terror psicológico com narrativa episódica.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/541570/library_600x900.jpg",
                        LocalDate.of(2016, 12, 14)
                ),

                createGame(
                        "Jusant",
                        List.of(Genre.ADVENTURE),
                        "Aventura de escalada com exploração e narrativa ambiental.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1977170/library_600x900.jpg",
                        LocalDate.of(2023, 10, 31)
                ),

                createGame(
                        "Detroit: Become Human",
                        List.of(Genre.ADVENTURE),
                        "Aventura narrativa futurista focada em escolhas e consequências.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1222140/library_600x900.jpg",
                        LocalDate.of(2020, 6, 18)
                ),

                createGame(
                        "Black Desert",
                        List.of(Genre.RPG),
                        "MMORPG de mundo aberto com combate em tempo real e ampla personalização.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/582660/library_600x900.jpg",
                        LocalDate.of(2017, 5, 24)
                ),

                createGame(
                        "Tony Hawk's Pro Skater 1 + 2",
                        List.of(Genre.SPORTS),
                        "Remake dos clássicos jogos de skate da franquia Tony Hawk.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2395210/library_600x900.jpg",
                        LocalDate.of(2023, 10, 3)
                ),

                createGame(
                        "Fishing Planet",
                        List.of(Genre.SPORTS),
                        "Simulador de pesca online com diversas espécies e ambientes realistas.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/380600/library_600x900.jpg",
                        LocalDate.of(2015, 8, 11)
                ),

                createGame(
                        "Backrooms: Escape Together",
                        List.of(Genre.HORROR, Genre.SURVIVAL),
                        "Jogo cooperativo de terror inspirado no universo das Backrooms.",
                        "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2141730/library_600x900.jpg",
                        LocalDate.of(2022, 10, 18)
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