//busca de jogos
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image, ScrollView } from "react-native";

import { Fonts } from "@/constants/fonts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Search() {
    const [search, setSearch] = useState("");

    //mock de jogos
    const games = [
        {
            id: "1",
            title: "The Last of Us Part II Remastered",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coa1gr.jpg",
        },
        {
            id: "2",
            title: "Cyberpunk 2077",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coaih8.jpg",
        },
        {
            id: "3",
            title: "Clair Obscur: Expedition 33",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9gam.jpg",
        },
        {
            id: "4",
            title: "Spider-Man: Miles Morales",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cobg1j.jpg",
        },
        {
            id: "5",
            title: "Resident Evil 2",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1ir3.jpg",
        },
        {
            id: "6",
            title: "Hades",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cob9kr.jpg",
        },
    ];

    //filtra os jogos conforme o texto digitado
    const filteredGames = games.filter((game) => 
        game.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#1F103C",
                paddingTop: 80,
                paddingHorizontal: 10,
            }}
        >
            {/* campo buscar jogos */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#321961",
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#6F57D2",
                    paddingHorizontal: 12,
                    marginBottom: 20,
                }}
            >
                <Ionicons
                    name="search"
                    size={22}
                    color="#726292"
                />

                <TextInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Buscar jogos"
                    placeholderTextColor="#726292"
                    style={{
                        flex: 1,
                        color: "#fff",
                        fontFamily: Fonts.body,
                        fontSize: 16,
                        paddingVertical: 12,
                        marginLeft: 8,
                    }}
                />
            </View>

            {/* logo de fundo (somente quando nada foi digitado) */}
            {search.trim() === "" && (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: -80,
                    }}
                >
                    <Image
                        source={require("../../assets/images/logo.png")}
                        style={{
                            width: 300,
                            height: 300,
                            opacity: 0.20,
                        }}
                        resizeMode="contain"
                    />
                </View>
            )}
            
            {/* resultados (somente após digitar algo) */}
            {search.trim() !== "" && (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom:  40,
                    }}
                >
                    {filteredGames.length  === 0 ? (
                        <Text
                            style={{
                                color: "#726292",
                                fontFamily: Fonts.body,
                                fontSize: 16,
                                textAlign: "center",
                                marginTop: 20,
                            }}
                        >
                            Nenhum jogo encontrado
                        </Text>
                    ) : (
                        filteredGames.map((game, index) => (
                            <View key={game.id}>
                                {/* botão que direciona para a tela game overview */}
                                <Pressable
                                    onPress={() => router.push("/game/[id].tsx")}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom: 14,
                                        paddingHorizontal: 6,
                                    }}
                                >
                                    {/* capa */}
                                    <Image
                                        source={{ uri: game.image}}
                                        style={{
                                            width: 70,
                                            height: 95,
                                            borderRadius: 8,
                                            marginRight: 14,
                                        }}
                                        resizeMode="cover"
                                    />

                                    {/* título */}
                                    <Text
                                        style={{
                                            flex: 1,
                                            color: "#fff",
                                            fontFamily: Fonts.body,
                                            fontSize: 16,
                                        }}
                                    >
                                        {game.title}
                                    </Text>
                                </Pressable>
                                
                            </View>
                        ))
                    )}
                </ScrollView>
            )}
        </View>
    );
}