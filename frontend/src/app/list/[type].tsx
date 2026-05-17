//tela única, lista dinâmica dos jogos (jogados, favoritos e desejos)
import React from "react";
import { View, Text, Pressable, Image, ScrollView, } from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Fonts } from "@/constants/fonts";

export default function GameList() {
    //parâmetro da rota (/list/played ou /list/favorites)
    const { type } = useLocalSearchParams<{ type: string }>();

    //título dinâmico
    const title =
        type === "played"
            ? "Jogados"
            : type === "favorites"
            ? "Favoritos"
            : "Lista;"
    
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
            rating: 3,
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
            rating: 4,
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

    
}