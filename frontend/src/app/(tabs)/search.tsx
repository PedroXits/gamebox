//busca de jogos
import React, { useState, useCallback, useEffect } from "react";
import { View, Text, TextInput, Pressable, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";

import { Fonts } from "@/constants/fonts";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";

import { findGameByName } from "@/services/GameService";
import { GameSearchResponse } from "@/models/game/GameSearchResponse";

export default function Search() {
    const [search, setSearch] = useState("");

    const [games, setGames] = useState<GameSearchResponse[]>([]);
    const [loading, setLoading] = useState(false);

    //limpa a pesquisa ao retornar para a tela search
    useFocusEffect(
        useCallback(() => {
            setSearch("");
        }, [])
    );

    useEffect(() => {
        async function searchGames() {
            if (search.trim() === "") {
                setGames([]);
                return;
            }

            try {
                setLoading(true);

                const response = await findGameByName(search);
                setGames(response);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        searchGames();
    }, [search]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
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
                        zIndex: 10,
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
                        autoCapitalize="none"
                        autoCorrect={false}
                        editable={true}
                        pointerEvents="auto"
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
                                opacity: 0.25,
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
                        {!loading && games.length === 0 ? (
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
                            games.map((game, index) => (
                                <View key={game.id}>
                                    {/* botão que direciona para a tela game overview */}
                                    <Pressable
                                        onPress={() => router.push(`/game/${game.id}`)}
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginBottom: 14,
                                            paddingHorizontal: 6,
                                        }}
                                    >
                                        {/* sombra da capa do jogo */}
                                        <View
                                            style={{
                                                marginRight: 14,
                                                borderRadius: 8,

                                                //sombra iOS
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 4,
                                                },
                                                shadowOpacity: 0.25,
                                                shadowRadius: 8,

                                                //sombra Android
                                                elevation: 5,
                                            }}
                                        >
                                            {/* capa */}
                                            <Image
                                                source={{ uri: game.gamePhoto }}
                                                style={{
                                                    width: 70,
                                                    height: 95,
                                                    borderRadius: 8,
                                                }}
                                                resizeMode="cover"
                                            />
                                        </View>

                                        {/* título */}
                                        <Text
                                            style={{
                                                flex: 1,
                                                color: "#fff",
                                                fontFamily: Fonts.body,
                                                fontSize: 16,
                                            }}
                                        >
                                            {game.gameName}
                                        </Text>
                                    </Pressable>

                                    {/* linha divisória */}
                                    {index < games.length - 1 && (
                                        <View
                                            style={{
                                                height: 1,
                                                backgroundColor: "rgba(255,255,255,0.08)",
                                                marginBottom: 14,
                                                marginHorizontal: 6,
                                            }}
                                        />
                                    )}
                                </View>
                            ))
                        )}
                    </ScrollView>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}