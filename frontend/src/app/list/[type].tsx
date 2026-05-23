//tela única, lista dinâmica dos jogos (jogados, favoritos e desejos)
import React, { useContext, useState } from "react";
import { View, Text, Pressable, Image, ScrollView, } from "react-native";

import { router, useLocalSearchParams, useFocusEffect  } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Fonts } from "@/constants/fonts";

import { AuthContext } from "@/context/AuthContext";
import { getPlayedByProfileId } from "@/services/PlayedService";
import { getFavoritesByProfileId } from "@/services/FavoriteService";
import { getReviewsByProfileId } from "@/services/ReviewService";
import { findByGameGenre } from "@/services/GameService";

export default function GameList() {

    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);

    const [games, setGames] = useState<
        {
            id: string;
            gameId: number;
            title: string;
            image: string;
            rating: number;
        }[]
    >([]);

    //parâmetro da rota (/list/played ou /list/favorites)
    const { type, genre } = useLocalSearchParams<{
        type: string;
        genre?: string;
    }>();

    const genreNames: Record<string, string> = {
        ACTION: "Ação",
        ADVENTURE: "Aventura",
        HORROR: "Terror",
        RACING: "Corrida",
        RPG: "RPG",
        SPORTS: "Esporte",
    };

    //título dinâmico
    const title =
        type === "played"
            ? "Jogados"
            : type === "favorites"
            ? "Favoritos"
            : type === "reviews"
            ? "Reviews"
            : type === "genre"
            ? genreNames[String(genre)] || String(genre)
            : "Lista";
    
    useFocusEffect(
        React.useCallback(() => {
            async function loadGames() {
                try {
                    setLoading(true);
                    setGames([]);   

                    if (type === "genre" && genre) {
                        const response = await findByGameGenre(String(genre));

                        setGames(
                            response.map((game) => ({
                                id: String(game.id),
                                gameId: game.id,
                                title: game.gameName,
                                image: game.bannerPhoto || game.gamePhoto,
                                rating: 0,
                            }))
                        );

                        return;
                    }

                    if (!user?.profileId) return;

                    const reviews =
                        await getReviewsByProfileId(user.profileId);

                    if (type === "played") {
                        const response =
                            await getPlayedByProfileId(user.profileId);

                        setGames(
                            response.map((game) => {
                                const review = reviews.find(
                                    (r) => r.gameId === game.gameId
                                );

                                return {
                                    id: String(game.playedId),
                                    gameId: game.gameId,
                                    title: game.gameName,
                                    image: game.bannerPhoto,
                                    rating: review?.rating ?? 0,
                                };
                            })
                        );
                    }

                    if (type === "favorites") {
                        const response =
                            await getFavoritesByProfileId(user.profileId);

                        setGames(
                            response.map((game) => {
                                const review = reviews.find(
                                    (r) => r.gameId === game.gameId
                                );

                                return {
                                    id: String(game.favoriteId),
                                    gameId: game.gameId,
                                    title: game.gameName,
                                    image: game.bannerPhoto,
                                    rating: review?.rating ?? 0,
                                };
                            })
                        );
                    }

                    if (type === "reviews") {
                        setGames(
                            reviews.map((review) => ({
                                id: String(review.reviewId),
                                gameId: review.gameId,
                                title: review.gameName,
                                image: review.bannerPhoto || review.gamePhoto,
                                rating: review.rating ?? 0,
                            }))
                        );

                        return;
                    }

                } catch (error) {
                    console.log(error);
                }

                finally {
                    setLoading(false);
                }
            }

            loadGames();
        }, [type, genre, user?.profileId])
    );

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#1F103C",
                paddingTop: 90,
                paddingHorizontal: 24,
            }}
        >
            {/* botão voltar */}
            <Pressable
                onPress={() => router.back()}
                style={{
                    position: "absolute",
                    top: 60,
                    left: 20,
                }}
            >
                <Ionicons
                    name="chevron-back"
                    size={28}
                    color="#fff"
                />
            </Pressable>

            {/* título */}
            <Text
                style={{
                    color: "#fff",
                    fontFamily: Fonts.body,
                    fontSize: 32,
                    textAlign: "center",
                    marginBottom: 35,
                }}
            >
                {title}
            </Text>

            {/* lista */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 40,
                }}
            >
                {!loading && games.length === 0 && (
                    <Text
                        style={{
                            color: "#726292",
                            fontFamily: Fonts.body,
                            fontSize: 16,
                            textAlign: "center",
                            marginTop: 40,
                        }}
                    >
                        Nenhum jogo encontrado.
                    </Text>
                )}
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        rowGap: 24,
                    }}
                >
                    {games.map((game) => (
                        <Pressable
                            key={game.id}
                            onPress={() => {
                                if (type === "reviews") {
                                    router.push({
                                        pathname: "/reviews",
                                        params: { gameId: game.gameId },
                                    });
                                } else {
                                    router.push(`/game/${game.gameId}`);
                                }
                            }}
                            style={{
                                width: "48%",
                            }}
                        >
                            {/* imagem horizontal */}
                            <Image
                                source={{ uri: game.image }}
                                style={{
                                    width: "100%",
                                    height: 100,
                                    borderRadius: 8,
                                    marginBottom: 6,
                                }}
                                resizeMode="cover"
                            />

                            {/* nome do jogo */}
                            <Text
                                style={{
                                    color: "#fff",
                                    fontFamily: Fonts.body,
                                    fontSize: 14,
                                    marginBottom: 2,
                                }}
                                numberOfLines={1}
                            >
                                {game.title}
                            </Text>

                            {/* estrelas (se houver avaliação) */}
                            {game.rating > 0 && (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 2,
                                    }}
                                >
                                    {Array.from({ length: 5 }).map((_, index) => {
                                        //posição da estrela (1 a 5)
                                        const starNumber = index + 1;

                                        //estrela cheia
                                        if (game.rating >= starNumber) {
                                            return (
                                                <FontAwesome
                                                    key={index}
                                                    name="star"
                                                    size={11}
                                                    color="#fff"
                                                />
                                            );
                                        }

                                        //meia estrela
                                        if (game.rating >= starNumber - 0.5) {
                                            return (
                                                <FontAwesome
                                                    key={index}
                                                    name="star-half-full"
                                                    size={11}
                                                    color="#fff"
                                                />
                                            );
                                        }

                                        //estrela vazia
                                        return (
                                            <FontAwesome
                                                key={index}
                                                name="star-o"
                                                size={11}
                                                color="#fff"
                                            />
                                        );
                                    })}
                                </View>
                            )}
                            
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}