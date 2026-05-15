//painel administrativo (dashboard)
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, Image } from "react-native";

import { router } from "expo-router";
import { Fonts } from "@/constants/fonts";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Game, useAdminGames } from "@/context/AdminGamesContext";
import DeleteModal from "@/components/DeleteModal";

export default function Admin() {
    const [search, setSearch] = useState("");
    const { games, deleteGame } = useAdminGames(); //pega os jogos de AdminGamesContext.tsx
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    //cria a lista filtrada, faz busca em tempo real
    const filteredGames = games.filter((game) =>
        game.title.toLowerCase().includes(search.toLowerCase())
    );

    function handleDeleteGame() {
        if (!selectedGame) {
            return;
        }

        deleteGame(selectedGame.id);
        setSelectedGame(null);
        setIsDeleteModalVisible(false);
    }

    return (
        <View
            style={{ 
                flex: 1, 
                backgroundColor: "#1F103C", 
                paddingHorizontal: 22, 
                paddingTop: 70,
            }}
        >
            {/* cabeçalho */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 40,
                }}
            >
                {/* ícone menu */}
                <Pressable onPress={() => router.replace("/")} 
                    style={{ 
                        marginRight: 48,
                    }}
                >
                    <Feather
                        name="menu"
                        size={30}
                        color="#fff"
                    />
                </Pressable>

                {/* título e subtítulo */}
                <View>
                    <Text
                        style={{
                            color: "#fff",
                            fontFamily: Fonts.title,
                            fontSize: 28,
                            textTransform: "uppercase",
                        }}
                    >
                        Painel Administrativo
                    </Text>

                    <Text
                        style={{
                            color: "#B8A9D6",
                            fontFamily: Fonts.body,
                            fontSize: 16,
                            marginTop: -10,
                            marginLeft: 10,
                        }}
                    >
                        Gerencie os jogos do catálogo
                    </Text>
                </View>
            </View>

            {/* campo de pesquisa */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#1F103C",
                    borderRadius: 13,
                    paddingHorizontal: 16,
                    paddingVertical: 4,
                    marginBottom: 14,
                    borderWidth: 1,
                    borderColor: "#6F57D2",
                }}
            >
                <Ionicons
                    name="search-outline"
                    size={26}
                    color="rgba(255,255,255,0.5)"
                    style={{ marginRight: 10 }}
                />

                <TextInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Buscar jogos"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    style={{
                        flex: 1,
                        color: "#fff",
                        fontFamily: Fonts.body,
                        fontSize:  16,
                        paddingVertical: 12,
                    }}
                />
            </View>

            {/* botão Novo Jogo */}
            <Pressable onPress={() => router.push("/admin/newGame")}
                style={{
                    backgroundColor: "#381D6C",
                    borderRadius: 13,
                    paddingVertical: 16,
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#6F57D2",
                    marginBottom: 10,
                }}
            >
                <Text
                    style={{
                        color: "#fff",
                        fontFamily: Fonts.body,
                        fontSize: 14,
                    }}
                >
                    + NOVO JOGO
                </Text>
            </Pressable>

            {/* lista de jogos */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 14,
                    paddingBottom: 40,
                }}
            >
                {filteredGames.map((game) => (
                    <View
                        key={game.id}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "#1F103C",
                            borderRadius: 13,
                            padding: 4,
                            marginBottom: 10,
                            borderWidth: 1,
                            borderColor: "#6F57D2",
                        }}
                    >
                        {/* imagem */}
                        <Image
                            source={{ uri: game.image }}
                            style={{
                                width: 94,
                                height: 94,
                                borderRadius: 8,
                                marginRight: 12,
                            }}
                        />

                        {/* título do jogo */}
                        <View
                            style={{
                                flex: 1,
                                flexShrink: 1,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: Fonts.body,
                                    fontSize: 16,
                                    color: "#fff",
                                }}
                                numberOfLines={2}
                            >
                                {game.title}
                            </Text>
                        </View>

                        {/* botões */}
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 14,
                                marginRight: 12,
                            }}
                        >
                            {/* editar */}
                            <Pressable 
                                onPress={() => 
                                    router.push(`/admin/editGame/${game.id}`)
                                }
                            >
                                <Feather
                                    name="edit"
                                    size={26}
                                    color="#ba6cfa"
                                />
                            </Pressable>

                            {/* excluir */}
                            <Pressable onPress={() => {
                                    setSelectedGame(game);
                                    setIsDeleteModalVisible(true);
                                }}
                            >
                                <Feather
                                    name="trash-2"
                                    size={26}
                                    color="#FF2C2C"
                                />
                            </Pressable>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <DeleteModal
                visible={isDeleteModalVisible}
                game={selectedGame}
                onClose={() => {
                    setSelectedGame(null);
                    setIsDeleteModalVisible(false);
                }}
                onConfirm={handleDeleteGame}
            />
            
        </View>
    );
}