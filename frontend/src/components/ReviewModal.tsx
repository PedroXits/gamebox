import React from "react";
import { Modal, View, Text, Pressable, ScrollView, TextInput } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Fonts } from "@/constants/fonts";

type ReviewModalProps = {
    visible: boolean;
    rating: number;
    review: string;
    onClose: () => void;
    onChangeRating: (rating: number) => void;
    onChangeReview: (review: string) => void;
    onSubmit: () => void;
};

export default function ReviewModal({
    visible,
    rating,
    review,
    onClose,
    onChangeRating,
    onChangeReview,
    onSubmit,
}: ReviewModalProps) {
    function renderStar(starNumber: number) {
        let iconName: "star" | "star-half" | "star-outline" = "star-outline";

        if (rating >= starNumber) {
            iconName = "star";
        } else if (rating >= starNumber - 0.5) {
            iconName = "star-half";
        }

        return (
            <Pressable
                key={starNumber}
                onPress={() => {
                    //se clicar numa estrela já selecionada, alterna entre cheia e meia
                    if (rating === starNumber) {
                        onChangeRating(starNumber - 0.5);
                    } else {
                        onChangeRating(starNumber);
                    }
                }}
            >
                <Ionicons
                    name={iconName}
                    size={42}
                    color="#fff"
                    style={{ marginHorizontal: 4 }}
                />
            </Pressable>
        );
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
                    backgroundColor: "rgba(0, 0, 0, 0.78)",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 20,
                }}
            >
                <View
                    style={{
                        width: "100%",
                        maxWidth: 380,
                        backgroundColor: "#381D6C",
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: "rgba(255,255,255,0.15)",
                        padding: 24,
                    }}
                >
                    {/* título */}
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 24,
                            fontFamily: Fonts.body,
                            textTransform: "uppercase",
                            textAlign: "center",
                            marginBottom: 20,
                        }}
                    >
                        Avaliar jogo
                    </Text>

                    {/* estrelas */}
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            borderRadius: 13,
                            marginBottom: 14,
                            paddingVertical: 16,
                            borderWidth: 1,
                            borderColor: "rgba(255,255,255,0.15)",
                        }}
                    >
                        {[1, 2, 3, 4, 5].map(renderStar)}
                    </View>

                    {/* nota atual */}
                    <Text
                        style={{
                            color: "#B8A9D6",
                            fontFamily: Fonts.body,
                            textAlign: "center",
                            marginBottom: 35,
                        }}
                    >
                        Nota: {rating === 0 ? " " : rating.toFixed(1)}
                    </Text>

                    {/* campo de review */}
                    <TextInput
                        value={review}
                        onChangeText={onChangeReview}
                        placeholder="Deixe sua review aqui... (opcional)"
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        multiline
                        textAlignVertical="top"
                        style={{
                            minHeight: 160,
                            maxHeight:  200,
                            backgroundColor: "#291253",
                            borderRadius: 13,
                            padding: 16,
                            color: "#fff",
                            fontSize: 16,
                            fontFamily: Fonts.body,
                            marginBottom: 24,
                            borderWidth: 1,
                            borderColor: "rgba(255,255,255,0.15)",
                        }}
                    />

                    {/* botões */}
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 12,
                        }}
                    >
                        {/* cancelar */}
                        <Pressable
                            onPress={onClose}
                            style={{
                                flex: 1,
                                paddingVertical: 14,
                                alignItems: "center",
                                borderRadius: 100,
                                borderWidth: 1,
                                borderColor: "rgba(255,255,255,0.15)",
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

                        {/* enviar */}
                        <Pressable
                            onPress={onSubmit}
                            style={{
                                flex: 1,
                                paddingVertical: 14,
                                alignItems: "center",
                                borderRadius: 100,
                                borderWidth: 1,
                                borderColor: "rgba(255,255,255,0.15)",
                            }}
                        >
                            <Text
                            style={{
                                color: "#fff",
                                fontFamily: Fonts.body,
                                fontSize: 16,
                            }}
                        >
                            Enviar
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}