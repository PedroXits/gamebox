//lista de desejos
import React, { useContext, useState } from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { useFocusEffect } from "expo-router";
import { AuthContext } from "@/context/AuthContext";
import { getWishlistByProfileId } from "@/services/WishlistService";
import { WishlistSearchResponse } from "@/models/wishlist/WishlistSearchResponse";

import { Fonts } from "@/constants/fonts"; 
import { FontAwesome } from "@expo/vector-icons";

export default function Wishlist() {
    
    //conexão do back 

    //usuario
    const { user } = useContext(AuthContext);

    //wishlist
    const [wishlistGames, setWishlistGames] = useState<WishlistSearchResponse[]>([]);

    useFocusEffect(
        React.useCallback(() => {
            async function loadWishlist() {
                if (!user?.profileId) return;

                try {
                    const response =
                        await getWishlistByProfileId(user.profileId);

                    setWishlistGames(response);
                } catch (error) {
                    console.log(error);
                }
            }

            loadWishlist();
        }, [user?.profileId])
    );

    const games = wishlistGames.map((game) => ({
        ...game,
        rating: 0,
    }));

    return(
        <View
            style={{
                flex: 1,
                backgroundColor: "#1F103C",
                paddingTop: 90,
                paddingHorizontal: 24,
            }}
        >
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
                Lista de Desejos
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
                        Sua lista de desejos está vazia.
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
                            key={game.wishlistId}
                            onPress={() => router.push(`/game/${game.gameId}`)}
                            style={{
                                width: "48%",
                            }}
                        >
                            {/* imagem horizontal */}
                            <Image
                                source={{ uri: game.bannerPhoto }}
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
                                {game.gameName}
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
    )
}