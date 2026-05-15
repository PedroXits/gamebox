//perfil
import React from "react";
import { View, Text, Pressable, } from "react-native";

import { router } from "expo-router";
import { Fonts } from "@/constants/fonts";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
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
                <View
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: 80,
                        backgroundColor: "#fff",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 16,
                    }}
                >
                    <Ionicons
                        name="person-outline"
                        size={56}
                        color="#000"
                    />
                </View>

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