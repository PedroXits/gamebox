//tela única, lista dinâmica dos jogos (jogados, favoritos e desejos)
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Pressable, Image, ScrollView, } from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Fonts } from "@/constants/fonts";

import { AuthContext } from "@/context/AuthContext";
import { getWishlistByProfileId } from "@/services/WishlistService";
import { WishlistSearchResponse } from "@/models/wishlist/WishlistSearchResponse";

export default function GameList() {
    //parâmetro da rota (/list/played ou /list/favorites)
    const { type } = useLocalSearchParams<{ type: string }>();
    
    //integração backend

    //usuario
    const { user } = useContext(AuthContext);

    //wishlist
    const [wishlistGames, setWishlistGames] = useState<WishlistSearchResponse[]>([]);

    useEffect(() => {
        async function loadList() {
            if (!user?.profileId) return;

            try {
                if (type === "wishlist") {
                    const response =
                        await getWishlistByProfileId(user.profileId);

                    setWishlistGames(response);
                }
            } catch (error) {
                console.log(error);
            }
        }

        loadList();
    }, [type, user?.profileId]);

    //título dinâmico
    const title =
        type === "played"
            ? "Jogados"
            : type === "favorites"
            ? "Favoritos"
            : type === "wishlist"
            ? "Lista de desejos"
            : "Lista";
    
    //mock de jogos jogados
    const playedGames = [
        {
            id: "1",
            title: "Spider-Man: Miles Morales",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cobg1j.jpg",
            rating: 5,
        },
        {
            id: "2",
            title: "The Witcher 3: Wild Hunt", 
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coaarl.jpg",
            rating: 4,
        },
        {
            id: "3",
            title: "Hollow Knight: Silksong",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cobebu.jpg",
            rating: 0,
        },
        {
            id: "4",
            title: "Celeste",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cob9dh.jpg",
            rating: 3.5,
        },
        {
            id: "5",
            title: "Hades",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cob9kr.jpg",
            rating: 3,
        },
        {
            id: "6",
            title: "Cuphead",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co62ao.jpg",
            rating: 0,
        },
    ]

    //mock jogos favoritos
    const favoriteGames = [
        {
            id: "1",
            title: "Tomb Raider",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1rbu.jpg",
            rating: 4.5,
        },
        {
            id: "2",
            title: "The Last of Us Part II Remastered",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coa1gr.jpg",
            rating: 5,
        },
        {
            id: "3",
            title: "Resident Evil 2",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1ir3.jpg",
            rating: 0,
        },
        {
            id: "4",
            title: "Cyberpunk 2077",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coaih8.jpg",
            rating: 4,
        },
        {
            id: "5",
            title: "Clair Obscur: Expedition 33",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9gam.jpg",
            rating: 5,
        },
        {
            id: "6",
            title: "Red Dead Redemptin 2",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1q1f.jpg",
            rating: 4,
        },
    ];

    //define qual lista será exibida
    const games =
        type === "wishlist"
            ? wishlistGames.map((item) => ({
                id: String(item.gameId),
                title: item.gameName,
                image: item.gamePhoto,
                rating: 0,
            }))
            : [];

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
                {games.length === 0 && (
                    <Text
                        style={{
                            color: "#B8A9D6",
                            fontFamily: Fonts.body,
                            fontSize: 16,
                            textAlign: "center",
                            marginTop: 40,
                        }}
                    >
                        Nenhum jogo encontrado nessa lista.
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
                            onPress={() => router.push(`/game/${game.id}`)}
                            style={{
                                width: "48%",
                            }}
                        >
                            {/* imagem horizontal */}
                            <Image
                                source={{ uri: game.image }}
                                style={{
                                    width: "100%",
                                    height: 103,
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