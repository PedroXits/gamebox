//cardzinho do busque por gêneros
import { Fonts } from "@/constants/fonts";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type Props = {
    title: string;
    image: any;
};

export function GenreCard({ title, image }: Props) {
    return (
        <View style={styles.card}>
            <Image source={image} style={styles.image} />

            {/* overlay escuro */}
            <View style={styles.overlay} />

            {/* texto */}
            <Text style={styles.text}>{title}</Text>
        </View> 
    );
}

const styles = StyleSheet.create({
    card: {
        width: 140,
        height: 130,
        borderRadius: 14,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
        marginBottom: 40,
    },

    image: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(62, 5, 116, 0.4)",
    },

    text: {
        color: "#fff",
        fontSize: 24,
        textAlign: "center",
        fontFamily: Fonts.body,
    },
});