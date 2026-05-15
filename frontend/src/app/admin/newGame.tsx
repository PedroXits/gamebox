//cadastro de um novo jogo
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image, Alert } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
        <KeyboardAwareScrollView
            style={{
                flex: 1,
                backgroundColor: "#1F103C",
            }}
            contentContainerStyle={{
                paddingHorizontal: 20,
                paddingTop: 55,
                paddingBottom: 40,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            extraScrollHeight={60}
        >
            {/* cabeçalho */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 30,
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
                    marginBottom: 14,
                    marginLeft: 8,
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
                    marginHorizontal: 36,
                    marginBottom: 30,
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

            {/* campo título do jogo */}
            <Text
                style={{
                    color: "#fff",
                    fontFamily: Fonts.body,
                    fontSize: 16,
                    marginBottom: 8,
                }}
            >
                Título do jogo
            </Text>

            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Ex: Life is Strange"
                placeholderTextColor="rgba(255,255,255,0.45)"
                style={{
                    backgroundColor: "#381D6C",
                    borderRadius: 13,
                    borderWidth: 1,
                    borderColor: "#6F57D2",
                    color: "#fff",
                    fontFamily: Fonts.body,
                    fontSize: 16,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    marginBottom: 20,
                }}
            />

            {/* campo ano de lançamento */}
            <Text
                style={{
                    color: "#fff",
                    fontFamily: Fonts.body,
                    fontSize: 16,
                    marginBottom: 8,
                }}
            >
                Ano de lançamento
            </Text>

            <TextInput
                value={year}
                onChangeText={setYear}
                placeholder="Ex: 2015"
                placeholderTextColor="rgba(255,255,255,0.45)"
                keyboardType="numeric"
                style={{
                    backgroundColor: "#381D6C",
                    borderRadius: 13,
                    borderWidth: 1,
                    borderColor: "#6F57D2",
                    color: "#fff",
                    fontFamily: Fonts.body,
                    fontSize: 16,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    marginBottom: 20,
                }}
            />

            {/* campo gênero do jogo */}
            <Text
                style={{
                    color: "#fff",
                    fontFamily: Fonts.body,
                    fontSize: 16,
                    marginBottom: 8,
                }}
            >
                Gêneros
            </Text>

            <TextInput
                value={genres}
                onChangeText={setGenres}
                placeholder="Ex: Ação, Aventura"
                placeholderTextColor="rgba(255,255,255,0.45)"
                style={{
                    backgroundColor: "#381D6C",
                    borderRadius: 13,
                    borderWidth: 1,
                    borderColor: "#6F57D2",
                    color: "#fff",
                    fontFamily: Fonts.body,
                    fontSize: 16,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    marginBottom: 20,
                }}
            />

            {/* campo descrição */}
            <Text
                style={{
                    color: "#fff",
                    fontFamily: Fonts.body,
                    fontSize: 16,
                    marginBottom: 8,
                }}
            >
                Descrição
            </Text>

            <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Fale sobre o jogo..."
                placeholderTextColor="rgba(255,255,255,0.45)"
                multiline
                scrollEnabled={false}
                textAlignVertical="top"
                style={{
                    backgroundColor: "#381D6C",
                    borderRadius: 13,
                    borderWidth: 1,
                    borderColor: "#6F57D2",
                    color: "#fff",
                    fontFamily: Fonts.body,
                    fontSize: 16,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    minHeight: 100,
                    marginBottom: 30,
                }}
            />

            {/* botões */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 16,
                }}
            >
                {/* cancelar */}
                <Pressable onPress={() => router.back()}
                    style={{
                        flex: 1,
                        backgroundColor: "#381D6C",
                        borderRadius: 13,
                        borderWidth: 1,
                        borderColor: "#6F57D2",
                        alignItems: "center",
                        paddingVertical: 16,

                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 8,
                        elevation: 8,
                    }}
                >
                    <Text
                        style={{
                            color: "#fff",
                            fontFamily: Fonts.body,
                            fontSize: 16,
                        }}
                    >
                        Cancelar
                    </Text>
                </Pressable>

                {/* adicionar */}
                <Pressable onPress={handleAddGame}
                    style={{
                        flex: 1,
                        backgroundColor: "#381D6C",
                        borderRadius: 13,
                        borderWidth: 1,
                        borderColor: "#6F57D2",
                        alignItems: "center",
                        paddingVertical: 16,

                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 8,
                        elevation: 8,
                    }}
                >
                    <Text
                        style={{
                            color: "#fff",
                            fontFamily: Fonts.body,
                            fontSize: 16,
                        }}
                    >
                        Adicionar
                    </Text>
                </Pressable>
            </View>
        </KeyboardAwareScrollView>
    );
}