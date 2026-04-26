//card vertical do jogo (home e listas)
import React from "react";
import { Image, Pressable } from "react-native";
import { router } from "expo-router";

//define quais dados o componente precisa receber. Props="propriedades"
type Props = {
    id: string;
    image: string;
};

export function GameCard({ id, image }: Props) {
    return(
        <Pressable onPress={() => router.push(`/game/${id}`)}>
            <Image
                source={{ uri: image }}
                style={{ 
                    width: 100, 
                    height: 140, 
                    borderRadius: 10, 
                    marginRight: 10
                }}
            />
        </Pressable>
    );
}