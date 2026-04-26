//seção da home, lista horizontal
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { GameCard } from "./GameCard";

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
                marginBottom: 10, 
                fontWeight: "600"
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