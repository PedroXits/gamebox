//game overview dinâmico
import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function GameOverview() {
    const { id } = useLocalSearchParams();

    const games = {
        tlou: {
            title: "The Last of Us Part II Remastered",
            year: "2020",
            genres: "Ação, Survival Horror",
            image: "https://image.api.playstation.com/vulcan/img/rnd/202010/2618/Y02ljdB7V37H4U5h.png",
            description: "é um jogo de ação e aventura focado em narrativa, ambientado cinco anos após o original. A história acompanha Ellie em uma jornada brutal de vingança em um Estados Unidos pós-apocalíptico, explorando as consequências emocionais e físicas de seus atos, além de apresentar Abby, uma segunda protagonista jogável.",
        },

        gow: {
            title: "God of War",
            year: "2018",
            genres: "Ação, Aventura",
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202109/2821/7jLx7JYkX6vK9Qn6.png",
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
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text
                style={{
                    color: "#fff",
                    fontSize: 28,
                    fontWeight: "bold",
                }}
            >
                {game.title}
            </Text>
        </View>
    );
}