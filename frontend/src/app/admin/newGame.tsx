//cadastro de um novo jogo
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image, ScrollView, Alert, } from "react-native";

import { router } from "expo-router";
import { Fonts } from "@/constants/fonts";
import { Feather } from "@expo/vector-icons";
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


}