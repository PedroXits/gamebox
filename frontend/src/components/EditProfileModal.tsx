//pop-up para editar perfil
import React, { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, Pressable, Image, } from "react-native";

import { Fonts } from "@/constants/fonts";
import { Feather } from "@expo/vector-icons";

type EditProfileModalProps = {
    visible: boolean;
    profileImage: string;
    profileName: string;
    onClose: () => void;
    onPickImage: () => void;
    onEditName: (newName: string) => void;
};

export default function EditProfileModal({
    visible,
    profileImage,
    profileName,
    onClose,
    onPickImage,
    onEditName,
}: EditProfileModalProps) {
    //nome temporário para edição
    const [editedName, setEditedName] = useState(profileName);

    //sempre que abrir o modal, carrega o nome atual
    useEffect(() => {
        if (visible) {
            setEditedName(profileName);
        }
    }, [visible, profileName]);

    //confirma a edição
    function handleConfirm() {
        onEditName(editedName.trim() || profileName);
        onClose();
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            {/* fundo do pop-up */}
            <View
                style={{
                    flex: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 24,
                }}
            >
                {/* caixa do modal */}
                <View
                    style={{
                        width: "100%",
                        backgroundColor: "#381D6C",
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: "#6F57D2",
                        padding: 24,
                    }}
                >
                    {/* título */}
                    <Text
                        style={{
                            color: "#fff",
                            fontFamily: Fonts.title,
                            fontSize: 26,
                            textTransform: "uppercase",
                            textAlign: "center",
                            marginBottom: 10,
                        }}
                    >
                        Editar Perfil
                    </Text>

                    {/* avatar clicável */}
                    <Pressable
                        onPress={onPickImage}
                        style={{
                            width: 110,
                            height: 110,
                            borderRadius: 70,
                            backgroundColor: "#fff",
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "center",
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
                            <Feather
                                name="plus-circle"
                                size={38}
                                color="rgba(95, 60, 128, 0.5)"
                            />
                        )}
                    </Pressable>

                     {/* campo para editar o nome */}
                     <Text
                        style={{
                            color: "#fff",
                            fontFamily: Fonts.body,
                            fontSize: 16,
                            marginBottom: 8,
                        }}
                    >
                        Nome
                    </Text>
                    
                    <TextInput
                        value={editedName}
                        onChangeText={setEditedName}
                        maxLength={12}
                        placeholder="Adicione seu nome"
                        placeholderTextColor="#726292"
                        style={{
                            backgroundColor: "#321961",
                            borderRadius: 13,
                            borderWidth: 1,
                            borderColor: "#6F57D2",
                            color: "#fff",
                            fontFamily: Fonts.body,
                            fontSize: 18,
                            // textAlign: "center",
                            paddingVertical: 14,
                            paddingHorizontal: 20,
                            marginBottom: 28,
                        }}
                    />

                </View>
            </View>
        </Modal>
    )
}