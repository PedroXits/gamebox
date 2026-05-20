import React, { useRef, useState, useEffect }from "react";
import { ScrollView, View, Image, Text, FlatList, Dimensions } from "react-native";
import { GameList } from "@/components/GameList";
import { Fonts } from "@/constants/fonts";
import { GenreCard } from "@/components/GenreCard";
import { findAllGames, findRecentGames } from "@/services/GameService";
import { GameSearchResponse } from "@/models/game/GameSearchResponse";

export default function Home() {
    const { width } = Dimensions.get("window"); //pega a largura do celular e ocupa a tela inteira

    const [games, setGames] = useState<GameSearchResponse[]>([]);
    const [recentGames, setRecentGames] = useState<GameSearchResponse[]>([]);

    useEffect(() => {
        async function loadGames() {
            try {
                const response = await findAllGames();
                setGames(response);

                const recent = await findRecentGames();
                setRecentGames(recent);
            } catch (error) {
                console.log(error);
            }
        }

        loadGames();
    }, []);

    const homeGames = games.map((game) => ({
        id: String(game.id),
        image: game.gamePhoto,
    }));

    const actionGames = games
        .filter((game) =>
            game.genres.includes("ACTION")
        )
        .map((game) => ({
            id: String(game.id),
            image: game.gamePhoto,
        }));

    const adventureGames = games
        .filter((game) =>
            game.genres.includes("ADVENTURE")
        )
        .map((game) => ({
            id: String(game.id),
            image: game.gamePhoto,
        }));

    const sportsGames = games
        .filter((game) =>
            game.genres.includes("SPORTS")
        )
        .map((game) => ({
            id: String(game.id),
            image: game.gamePhoto,
        }));

    const horrorGames = games
        .filter((game) =>
            game.genres.includes("HORROR")
        )
        .map((game) => ({
            id: String(game.id),
            image: game.gamePhoto,
        }));

    const recentHomeGames = recentGames
        .map((game) => ({
            id: String(game.id),
            image: game.gamePhoto,
        }));

    // banners / lista de imagens do carrossel
    const banners = 
        recentGames.length > 0
            ? recentGames
                .slice(0, 3)
                .map((game) => game.gamePhoto)
            :[
                "https://via.placeholder.com/800x400"
            ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList<string>>(null);

    //autoplay
    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % banners.length; //loop infinito

            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });

            setCurrentIndex(nextIndex);
        }, 4000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    return(
        <ScrollView style={{ flex: 1, backgroundColor: "#1F103C"}}>

            {/* banner do topo */}
            <View style={{ paddingBottom: 20 }}>
                <View>

                    {/* carrossel */}
                    <FlatList
                        ref={flatListRef}
                        data={banners}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(_, index) => index.toString()}

                        onMomentumScrollEnd={(event: any) => {
                            const index = Math.round(
                                event.nativeEvent.contentOffset.x / width
                            );
                            setCurrentIndex(index);
                        }}

                        renderItem={({ item }) => (
                            <Image
                                source={{ uri: item }}
                                style={{ 
                                    width: width, 
                                    height: 230,
                                }}
                                resizeMode="cover"
                            />
                        )}
                    />

                {/* titulo do banner */}
                <Text
                    style={{
                        position: "absolute",
                        bottom: 20,
                        width: "100%",
                        textAlign: "center",
                        color: "#fff",
                        fontSize: 20,
                        fontFamily: Fonts.title,
                        textShadowColor: "#000",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 4,
                    }}
                >
                    DESTAQUES
                </Text>

                {/* bolinhas do banner */}
                <View
                    style={{
                        position: "absolute",
                        bottom: 12,
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 6,
                    }}
                >
                    {banners.map((_, index) => (
                        <View
                            key={index}
                            style={{
                                width: 9,
                                height: 9,
                                borderRadius: 10,
                                backgroundColor: index === currentIndex ? "#fff" : "#888",
                            }}
                        />
                    ))}
                </View>

            </View>
        </View>
            
            {/* listas dos jogos */}
            <View style={{ paddingHorizontal: 20 }}>
                <GameList title="Populares" games={homeGames}/>
                <GameList title="Tiro porrada e bomba" games={actionGames}/>
                <GameList title="Lançamentos" games={recentHomeGames}/>

            {/* card dos gêneros */}
            <Text
                style={{
                    color: "#fff",
                    marginTop: 25,
                    marginBottom: 14,
                    fontFamily: Fonts.body,
                    fontSize: 18,
                }}
            >
                Busque por gêneros
            </Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 20 }}
            >
                <GenreCard
                    title="Ação"
                    image={require("@/assets/images/genero.png")}
                />

                <GenreCard
                    title="Aventura"
                    image={require("@/assets/images/genero.png")}
                />

                <GenreCard
                    title="Corrida"
                    image={require("@/assets/images/genero.png")}
                />

                <GenreCard
                    title="Esporte"
                    image={require("@/assets/images/genero.png")}
                />

                <GenreCard
                    title="Survival Horror"
                    image={require("@/assets/images/genero.png")}
                />

                <GenreCard
                    title="RPG"
                    image={require("@/assets/images/genero.png")}
                />
            </ScrollView>
                
                <GameList title="Aventura" games={adventureGames}/>
                <GameList title="Esporte" games={sportsGames}/>
            </View>
            
        </ScrollView>
    );
}