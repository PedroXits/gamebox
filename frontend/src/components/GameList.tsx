//seção da home, lista horizontal
import React from "react";
import { ScrollView, Text, View } from "react-native";

import { GameCard } from "./GameCard";
import { Fonts } from "@/constants/fonts";

type Game = {
    id: string;
    image: string;
};

//recebe o nome da seção e lista dos jogos
type Props = {
    title: string;
    games: Game[];
};

export function GameList({ title, games }: Props) {
    return(
        <View style={{ marginBottom: 24 }}>
            <Text style={{ 
                color: "#fff", 
                fontSize: 16,
                fontFamily: Fonts.body,
                marginBottom: 10,
                }}
            >
                {title}
            </Text>

            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
            >
                {games.map((game) => (
                    <GameCard 
                        key={game.id} 
                        id={game.id} 
                        image={game.image}
                    />
                ))}
            </ScrollView>
        </View>
    )
}