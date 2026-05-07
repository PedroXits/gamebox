//game overview dinâmico
import React from "react";
import { View, Text, Image, Pressable, ScrollView, } from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Fonts } from "@/constants/fonts";

export default function GameOverview() {
    const { id } = useLocalSearchParams();

    const games = {
        tlou: {
            title: "The Last of Us Part II Remastered",
            year: "2020",
            genres: "Ação, Survival Horror",
            image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2531310/header.jpg?t=1750959180",
            description: "é um jogo de ação e aventura focado em narrativa, ambientado cinco anos após o original. A história acompanha Ellie em uma jornada brutal de vingança em um Estados Unidos pós-apocalíptico, explorando as consequências emocionais e físicas de seus atos, além de apresentar Abby, uma segunda protagonista jogável.",
        },

        gow: {
            title: "God of War",
            year: "2018",
            genres: "Ação, Aventura",
            image: "https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S1_2560x1440-5d74d9b240bba8f2c40920dcde7c5c67_2560x1440-5d74d9b240bba8f2c40920dcde7c5c67",
            description: "Ambientado na mitologia nórdica, o espartano vive como um mortal em Midgard e deve proteger seu filho, Atreus, enquanto enfrentam deuses e monstros nórdicos.",
        },
    };

    // games.tlou 
    const game = games[id as keyof typeof games];

    if (!game) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#1E0F3A",
                }}
            >
                <Text style={{ color: "#fff" }}>
                    Jogo não encontrado
                </Text>
            </View>
        );
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#1E0F3A",
            }}
        >
            {/* banner */}
            <View>
                <Image
                    source={{ uri: game.image }}
                    style={{
                        width: "100%",
                        height: 250,
                    }}
                    resizeMode="cover"
                />
                
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
            </View>

            <View
                style={{
                    padding: 20,
                }}
            >
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 36,
                        fontFamily: Fonts.title,
                        marginBottom: 8,
                    }}
                >
                    {game.title}
                </Text>

                <Text
                    style={{
                        color: "#aaa",
                        marginBottom: 10,
                        fontFamily: Fonts.body,
                    }}
                >
                    {game.year} • {game.genres}
                </Text>

                <Text
                    style={{
                        color: "#fff",
                        lineHeight: 24,
                        fontFamily: Fonts.body,
                    }}
                >
                    {game.description}
                </Text>
            </View>
        </View>
        
    );
}