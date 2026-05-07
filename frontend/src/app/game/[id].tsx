//game overview dinâmico
import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function GameOverview() {
    const { id } = useLocalSearchParams();

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
                Jogo: {id}
            </Text>
        </View>
    );
}