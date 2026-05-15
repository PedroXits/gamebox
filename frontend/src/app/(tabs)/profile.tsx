//perfil
import React, { useState } from "react";
import { View, Text, Pressable, Image, Alert, Linking, } from "react-native";

import { router } from "expo-router";
import { Fonts } from "@/constants/fonts";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function Profile() {
    //imagem de perfil selecionada pelo usuário
    const [profileImage, setProfileImage] = useState("");

    //abre a galeria para selecionar uma foto de perfil
    async function pickImage() {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

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
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#1F103C",
                paddingHorizontal: 24,
                paddingTop: 90,
            }}
        >
            {/* botão voltar */}
            <Pressable
                onPress={() => router.back()}
                style={{
                    position: "absolute",
                    top: 60,
                    left: 20,
                }}
            >
                <Ionicons
                    name="chevron-back"
                    size={28}
                    color="#fff"
                />
            </Pressable>

            {/* avatar e informações do usuário */}
            <View
                style={{
                    alignItems: "center",
                    marginBottom: 40,
                }}
            >
                {/* avatar */}
                <Pressable
                    onPress={pickImage}
                    style={{
                        width: 110,
                        height: 110,
                        borderRadius: 70,
                        backgroundColor: "#fff",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 16,
                        overflow: "hidden",
                    }}
                >
                    {profileImage ? (
                        <Image
                            source={{ uri: profileImage }}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            resizeMode="cover"
                        />
                    ) : (
                        <Ionicons
                            name="person-outline"
                            size={56}
                            color="#000"
                        />
                    )}
                </Pressable>

                {/* nome */}
                <Text
                    style={{
                        color: "#fff",
                        fontFamily: Fonts.body,
                        fontSize: 21,
                        marginBottom: 4,
                    }}
                >
                    Demi Lovato
                </Text>

                {/* username */}
                <Text
                    style={{
                        color: "#726292",
                        fontFamily: Fonts.body,
                        fontSize: 17,
                    }}
                >
                    @ddlovato
                </Text>
            </View>

            {/* linha divisória */}
            <View
                style={{
                    height: 1,
                    backgroundColor: "rgba(255,255,255,0.25)",
                }}
            />
        </View>
    );
}