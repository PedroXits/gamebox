//edição de um jogo existente
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image, Alert, Linking, } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { router, useLocalSearchParams } from "expo-router";
import { Fonts } from "@/constants/fonts";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useAdminGames } from "@/context/AdminGamesContext";

export default function EditGame() {
    const { id } = useLocalSearchParams();
    const { games, updateGame } = useAdminGames();

    //localiza o jogo pelo id recebido na rota
    const game = games.find((game) => game.id === String(id));

    //se o jogo não for encontrado, volta para a tela anterior
    if (!game) {
        router.back();
        return undefined;
    }

    //estados iniciados com os dados já existentes
    const [title, setTitle] = useState(game.title);
    const [year, setYear] = useState(game.year);
    const [genres, setGenres] = useState(game.genres);
    const [description, setDescription] = useState(game.description);
    const [image, setImage] = useState(game.image);

    //abre a galeria para selecionar uma imagem
    async function pickImage() {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        //se o usuário negou o acesso
        if (!permission.granted) {
            Alert.alert(
                "Permissão necessária",
                "É preciso permitir acesso às fotos.",
                [
                    { 
                        text: "Cancelar", 
                        style: "cancel", 
                    }, 
                    { 
                        text: "Abrir Ajustes", 
                        onPress: () => Linking.openSettings(), 
                    },
                ]
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

    //atualiza o jogo no AdminGamesContext
    function handleUpdateGame() {
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

        updateGame({
            id: String(id),
            title,
            year,
            genres,
            image,
            description,
        });
        
        router.back();;
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
                {/* voltar */}
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
                    Editar Jogo
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
                    lineHeight: 20,
                    textAlign: "justify",
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

                {/* atualizar */}
                <Pressable onPress={handleUpdateGame}
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
                        Atualizar
                    </Text>
                </Pressable>
            </View>
        </KeyboardAwareScrollView>
    );
}