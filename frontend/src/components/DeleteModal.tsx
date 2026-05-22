//exclusão de jogos (dashboard)
import React from "react";
import { Modal, View, Text, Pressable, } from "react-native";

import { Fonts } from "@/constants/fonts";
import { GameSearchResponse } from "@/models/game/GameSearchResponse";
import { Feather, EvilIcons } from "@expo/vector-icons";

type DeleteModalProps = {
    visible: boolean;
    game: GameSearchResponse | null;
    onClose: () => void;
    onConfirm: () => void;
};

export default function DeleteModal({
    visible,
    game,
    onClose,
    onConfirm,
}: DeleteModalProps) {
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
                    {/* ícone da lixeira */}
                    <View
                        style={{
                            alignItems: "center",
                            marginBottom: 10,
                        }}
                    >
                        <EvilIcons
                            name="trash"
                            size={90}
                            color={"#FF2C2C"}
                        />
                    </View>

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
                        Excluir Jogo?
                    </Text>

                    {/* mensagem */}
                    <Text
                        style={{
                            color: "#fff",
                            fontFamily: Fonts.body,
                            fontSize: 18,
                            textAlign: "center",
                            lineHeight: 24,
                            marginBottom: 24,
                        }}
                    >
                        Tem certeza que deseja{"\n"} excluir{" "}
                        <Text
                            style={{
                                color: "#FF2C2C",
                            }}
                        >
                            "{game?.gameName}"
                        </Text>
                        ?
                    </Text>

                    {/* botões */}
                    <View
                        style={{
                            gap: 14,
                        }}
                    >
                        {/* excluir */}
                        <Pressable onPress={onConfirm}
                            style={{
                                backgroundColor: "#a81919",
                                borderRadius: 13,
                                borderWidth: 1,
                                borderColor: "#a81919",
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
                                    textTransform: "uppercase",
                                }}
                            >
                                Excluir
                            </Text>
                        </Pressable>

                        {/* cancelar */}
                        <Pressable onPress={onClose}
                            style={{
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
                                    textTransform: "uppercase",
                                }}
                            >
                                Cancelar
                            </Text>
                        </Pressable>
                        
                    </View>
                </View>
            </View>
        </Modal>
    );
}