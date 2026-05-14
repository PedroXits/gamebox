import React, { useState } from "react";
import { View, Text, TextInput, Pressable, } from "react-native";

import { router } from "expo-router";
import { Fonts } from "@/constants/fonts";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function Admin() {
    const [search, setSearch] = useState("");

    return (
        <View
            style={{ 
                flex: 1, 
                backgroundColor: "#1F103C", 
                paddingHorizontal: 24, 
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
        </View>
    );
}