//cadastro de um novo jogo
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image, ScrollView, Alert, } from "react-native";

import { router } from "expo-router";
import { Fonts } from "@/constants/fonts";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useAdminGames } from "@/context/AdminGamesContext";

export default function NewGame() {
    const { addGame } = useAdminGames();

    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [genres, setGenres] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    //abre a galeria para selecionar uma imagem
    async function pickImage() {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            Alert.alert(
                "Permissão necessária",
                "É preciso permitir acesso às fotos."
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    //adiciona o jogo ao AdminGamesContext.tsx, quando usuário clica no botão "adicionar"
    function handleAddGame() {
        if (
            !title ||
            !year ||
            !genres ||
            !description ||
            !image
        ) {
            Alert.alert(
                "Campos obrigatórios",
                "Preencha todos os campos."
            );
            return;
        }

        addGame({
            id: Date.now().toString(),
            title,
            year,
            genres,
            image,
            description,
        });
        
        router.back();
    }

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: "#1F103C",
            }}
            contentContainerStyle={{
                paddingHorizontal: 20,
                paddingTop: 70,
                paddingBottom: 40,
            }}
            showsVerticalScrollIndicator={false}
        >
            {/* cabeçalho */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 36,
                }}
            >
                {/* menu */}
                <Pressable onPress={() => router.back()} 
                    style={{ 
                        marginRight: 48,
                    }}
                >
                    <Ionicons
                        name="chevron-back"
                        size={28}
                        color="#fff"
                    />
                </Pressable>

                {/* título */}
                <Text
                    style={{
                        flex: 1,
                        fontFamily: Fonts.title,
                        fontSize: 28,
                        textTransform: "uppercase",
                        textAlign: "center",
                        color: "#fff",
                        marginRight: 70,
                    }}
                >
                    Novo Jogo
                </Text>
            </View>

            {/* selecionar imagem */}
            <Text
                style={{
                    color: "#fff",
                    fontFamily: Fonts.body,
                    fontSize: 16,
                    marginBottom: 12,
                    marginLeft: 10,
                }}
            >
                Selecionar imagem
            </Text>

            <Pressable onPress={pickImage}
                style={{
                    height: 160,
                    backgroundColor: "#170b2e",
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 38,
                    marginBottom: 28,
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "#6F57D2",
                }}
            >
                {image ? (
                    <Image
                        source={{ uri: image }}
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        resizeMode="cover"
                    />
                ) : (
                    <Feather
                        name="plus-circle"
                        size={32}
                        color="rgba(255,255,255,0.5)"
                    />
                )}
            </Pressable>

            
        </ScrollView>
    );
}