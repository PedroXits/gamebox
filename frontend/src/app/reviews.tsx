//tela de avaliações
import React from "react";
import { View, Text, Image, ScrollView, Pressable, } from "react-native";

import { router } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Fonts } from "@/constants/fonts";

export default function Reviews() {

    //mock reviews
    const reviews = [
        {
            id: "1",
            gameName: "Life is Strange Remastered",
            year: "2015",
            gamePhoto: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1r8e.jpg",
            rating: 4.5,
            comment: "Fiquei muito gag jogando... piriririririripiririririririririrpororororororororasdkjaskdjaksjdaksdjksasjhdjhvsririrpororororororororasdkjaskdjaksjdapiririririririririrpororororororororasdkjaskdjaksjdaksdjksasjhdjhvsksdjksasjhdjhs",
            isFavorite: true,
        },
        {
            id: "2",
            gameName: "The Legend of Zelda: Breath of the Wild",
            year: "2020",
            gamePhoto: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co3p2d.jpg",
            rating: 5,
            comment: "Fiquei muito gag jogando... piririririririririrpororororororororasdkjaskdjaksjdapiririririririririrpororororororororasdkjaskdjaksjdaksdjksasjhdjhvsksdjksasjhdjhs",
            isFavorite: true,
        },
        {
            id: "3",
            gameName: "The Last of Us Part II Remastered",
            year: "2024",
            gamePhoto: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coa1gr.jpg",
            rating: 4,
            comment: "Fiquei muito gag jogando... piririririririririrpororororororororasdkjaskdjaksjdaksdjksasjpiririririririririrpororororovrorororasdkjaskdjaksjdaksdjksasjhdjhvsvhdjhvvvspiririririririririrpororororororororasdkjaskdjaksjdaksdjksasjpiririririririririrpororororovrorororasdkjaskdjaksjdaksdjksasjhdjhvsvhdjhvvvspiririririririririrpororororororororasdkjaskdjaksjdaksdjksasjpiririririririririrpororororovrorororasdkjaskdjaksjdaksdjksasjhdjhvsvhdjhvvvspiririririririririrpororororororororasdkjaskdjaksjdaksdjksasjpiririririririririrpororororovrorororasdkjaskdjaksjdaksdjksasjhdjhvsvhdjhvvvspiririririririririrpororororororororasdkjaskdjaksjdaksdjksasjpiririririririririrpororororovrorororasdkjaskdjaksjdaksdjksasjhdjhvsvhdjhvvvs",
            isFavorite: false,
        },
    ];

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
                {reviews.map((review) => (
                    <View
                        key={review.id}
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
                                        {review.year} •
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
                ))}
            </ScrollView>

        </View>
    );
}