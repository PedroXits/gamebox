//lista de desejos
import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

import { Fonts } from "@/constants/fonts";
import { FontAwesome } from "@expo/vector-icons";

export default function Wishlist() {
    //mock lista de desejos
    const wishlistGames = [
        {
            id: "1",
            title: "Mixtape",
            image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2582320/95bbf1097b6f66f39b56f6388250c97a2f43b59e/header.jpg?t=1778541597",
            rating: 0,
        },
        {
            id: "2",
            title: "Pragmata",
            image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3357650/e32e168b25ed68a0cf6264c220c07e96c2abfb56/header.jpg?t=1777351016",
            rating: 0,
        },
        {
            id: "3",
            title: "Forza Horizon 6",
            image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2483190/27abb1584a118d50d0e3950fd48d557c51981db7/header.jpg?t=1778870245",
            rating: 0,
        },
        {
            id: "4",
            title: "Subnautica 2",
            image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1962700/header.jpg?t=1778777511",
            rating: 0,
        },
        {
            id: "5",
            title: "Dead as Disco",
            image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3404260/ae0f4b71735adf4f2494ecb7914fcbafee215277/header.jpg?t=1778694984",
            rating: 0,
        },
        {
            id: "6",
            title: "Retro Rewind - Video Store Simulator",
            image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3552140/5be699540829c76a0d5f7ac5db4bbaf23fa76013/header.jpg?t=1777437290",
            rating: 0,
        },
    ]

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
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        rowGap: 24,
                    }}
                >
                    {wishlistGames.map((game) => (
                        <View
                            key={game.id}
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
                            
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}