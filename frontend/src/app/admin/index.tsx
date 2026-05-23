//painel administrativo (dashboard)
import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, ScrollView, Image, Modal } from "react-native";
import { deleteGame, findAllGames } from "@/services/GameService";
import { GameSearchResponse } from "@/models/game/GameSearchResponse";
import { router } from "expo-router";
import { Fonts } from "@/constants/fonts";
import { Feather, Ionicons } from "@expo/vector-icons";
import DeleteModal from "@/components/DeleteModal";
import { AuthContext } from "@/context/AuthContext";

export default function Admin() {
    const [search, setSearch] = useState("");
    const [isMenuVisible, setIsMenuVisible] = useState(false); //abre menu admin para sair (modal) 
    const [selectedGame, setSelectedGame] = useState<GameSearchResponse | null>(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const [games, setGames] = useState<GameSearchResponse[]>([]);

    useEffect(() => {
        loadGames();
    }, []);

    async function loadGames() {
        try {
            const response = await findAllGames();;

            setGames(response);

        } catch (error) {
            console.log(error);
        }       
    }

    useEffect(() => {
        if (user && user.role !== "ADMIN") {
            router.replace("/(tabs)/home");
        }
    }, [user]);

    if (!user || user.role !== "ADMIN") {
        return null;    
    }

    //cria a lista filtrada, faz busca em tempo real
    const filteredGames = games.filter((game) =>
        game.gameName.toLowerCase().includes(search.toLowerCase())
    );

    async function handleDeleteGame() {
        if (!selectedGame) {
            return;
        }

        await deleteGame(selectedGame.id);
        await loadGames();
        setSelectedGame(null);
        setIsDeleteModalVisible(false);
    }

    async function handleLogout() {
        await logout();
        setIsMenuVisible(false);
        router.replace("/");
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
                <Pressable onPress={() => setIsMenuVisible(true)} 
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
                            source={{ uri: game.gamePhoto }}
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
                                {game.gameName}
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

            {/* pop-up excluir jogo */}
            <DeleteModal
                visible={isDeleteModalVisible}
                game={selectedGame}
                onClose={() => {
                    setSelectedGame(null);
                    setIsDeleteModalVisible(false);
                }}
                onConfirm={handleDeleteGame}
            />

            {/* menu lateral */}
            <Modal
                visible={isMenuVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setIsMenuVisible(false)}
            >
                {/* overlay escuro */}
                <Pressable 
                    onPress={() => setIsMenuVisible(false)}
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(0,0,0,0.45)",
                    }}
                >
                    {/* menu */}
                    <Pressable 
                        onPress={(event) => event.stopPropagation()}
                        style={{
                            width: "62%",
                            height: "100%",
                            backgroundColor: "#321961",
                            paddingTop: 70,
                            paddingHorizontal: 24,
                            borderRightWidth: 1,
                            borderRightColor: "#6F57D2",
                        }}
                    >
                        {/* título */}
                        <Text
                            style={{
                                color: "#fff",
                                fontFamily: Fonts.title,
                                fontSize: 32,
                                textTransform: "uppercase",
                                marginBottom: 18,
                            }}
                        >
                            Gameboxd
                        </Text>

                        {/* linha divisória */}
                        <View
                            style={{
                                height: 1,
                                backgroundColor: "rgba(255,255,255,0.2)",
                                marginBottom: 24,
                            }}
                        />

                        {/* botão sair */}
                        <Pressable 
                            onPress={handleLogout}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 12,
                                paddingVertical: 14,
                            }}
                        >
                            <Feather
                                name="log-out"
                                size={22}
                                color="#fff"
                            />

                            <Text
                                style={{
                                    color: "#fff",
                                    fontFamily: Fonts.body,
                                    fontSize: 18,
                                }}
                            >
                                Sair
                            </Text>
                        </Pressable>
                    </Pressable>
                </Pressable>
            </Modal>
            
        </View>
    );
}