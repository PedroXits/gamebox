import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Fonts } from "@/constants/fonts";

import { AuthContext } from "@/context/AuthContext";
import { getReviewsByProfileId } from "@/services/ReviewService";
import { ReviewSearchResponse } from "@/models/review/ReviewSearchResponse";

export default function Reviews() {

    //mock reviews
    const { gameId } = useLocalSearchParams<{ gameId: string }>();
    const { user } = useContext(AuthContext);

    const [review, setReview] = useState<ReviewSearchResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadReview() {
            if (!user?.profileId || !gameId) return;

            try {
                const response = await getReviewsByProfileId(user.profileId);

                const item = response.find(
                    (review) => review.gameId === Number(gameId)
                );

                setReview(item ?? null);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        loadReview();
    }, [user?.profileId, gameId]);

    if (loading) {
        return null;
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#1F103C" }}>

            <View 
                style={{
                    paddingTop: 60,
                    paddingBottom: 20,
                    paddingHorizontal: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: "#7474744f",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {/* botão voltar */}
                <Pressable
                    onPress={() => router.back()}
                    style={{
                        position: "absolute",
                        left: 20,
                        top: 60,
                    }}
                >
                    <Ionicons
                        name="chevron-back"
                        size={28}
                        color="#fff"
                    />
                </Pressable>

                <Text
                    style={{
                        color: "#fff",
                        fontFamily: Fonts.body,
                        fontSize: 30,
                    }}
                >
                    Reviews
                </Text>
            </View>

            {/* lista */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    padding: 20,
                    paddingBottom: 40,
                }}
            >
                {!review ? (
                    <Text
                        style={{
                            color: "#726292",
                            fontFamily: Fonts.body,
                            fontSize: 16,
                            textAlign: "center",
                            marginTop: 40,
                        }}
                    >
                        Review não encontrada.
                    </Text>
                ) : (
                    <View
                        style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#7474744f",
                            paddingBottom: 20,
                            marginBottom: 20,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                gap: 16
                            }}
                        >
                            {/* texto não empurra imagem */}
                            <View style={{ flex: 1 }}>

                                {/* nome do jogo */}
                                <Text 
                                    style={{
                                        color: "#fff",
                                        fontSize: 18, 
                                        fontFamily: Fonts.body, 
                                        lineHeight: 24
                                    }}
                                >
                                    {review.gameName}
                                </Text>

                                {/* ano */}
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginTop: 4,
                                        marginBottom: 12,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#ffffff80",
                                            fontFamily: Fonts.body,
                                            fontSize: 14,
                                            marginRight: 6,
                                        }}
                                    >
                                        {review.releaseYear} •
                                    </Text>

                                    {/* estrelas */}
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            gap: 2,
                                        }}
                                    >
                                        {[1, 2, 3, 4, 5].map((star) => {
                                            let iconName: "star" | "star-half-empty" | "star-o" = "star-o";
                                            
                                            if (review.rating >= star) {
                                                iconName = "star";
                                            } else if (
                                                review.rating >= star - 0.5
                                            ) {
                                                iconName = "star-half-empty";
                                            }
                
                                            return (
                                                <FontAwesome
                                                    key={star}
                                                    name={iconName}
                                                    size={13}
                                                    color="#fff"
                                                />
                                            );
                                        })}
                                    </View>
                                </View>

                                {/* review */}
                                <Text
                                    style={{
                                        color: "white", 
                                        marginTop: 12,
                                        lineHeight: 22, 
                                        fontSize: 14
                                    }}
                                >
                                    {review.comment}
                                </Text>
                            </View>

                            {/* capa */}
                            <View
                                style={{
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    source={{
                                        uri: review.gamePhoto
                                    }}
                                    style={{
                                        width: 90,
                                        height: 130,
                                        borderRadius: 8 
                                    }}
                                    resizeMode="cover"
                                />

                                {/* coração de favorito */}
                                {review.isFavorite && (
                                    <FontAwesome
                                        name="heart"
                                        size={20}
                                        color="#fff"
                                        style={{
                                            marginTop: 8
                                        }}
                                    />
                                )}
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>

        </View>
    );
}