//game overview dinâmico
import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, Pressable, ScrollView, Dimensions } from "react-native";
import { getGameById } from "@/services/GameService";
import { GameResponse } from "@/models/game/GameResponse";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Fonts } from "@/constants/fonts";
import { useGames } from "@/context/GamesContext";
import ReviewModal from "@/components/ReviewModal";
import { addToWishlist, removeFromWishlist, getWishlistByProfileId } from "@/services/WishlistService";
import { AuthContext } from "@/context/AuthContext";
import { addToPlayed, removeFromPlayed, getPlayedByProfileId } from "@/services/PlayedService";

export default function GameOverview() {
    const { id } = useLocalSearchParams();
    
    const [game, setGame] = useState<GameResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const { favoriteGames, toggleFavorite, saveReview, getReview } = useGames();
    // const isPlayed = playedGames.includes(id as string);
    const isFavorite = favoriteGames.includes(id as string);
    // const isInWishlist = wishlistGames.includes(id as string);
    const savedReview = getReview(id as string);
    const rating = savedReview?.rating ?? 0;
    const review = savedReview?.review ?? "";
    const { width } = Dimensions.get("window");

    // elementos de integração com o back
    //usuario
    const { user } = useContext(AuthContext);

    //wishlist
    const [wishlistItemId, setWishlistItemId] = useState<number | null>(null);
    const isInWishlist = wishlistItemId !== null;

    //played
    const [playedItemId, setPlayedItemId] = useState<number | null>(null);

    const isPlayed = playedItemId !== null;

    const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
    const [tempRating, setTempRating] = useState<number>(0);
    const [tempReview, setTempReview] = useState("");

    useEffect(() => {
        async function loadWishlistStatus() {
            if (!user?.profileId || !id) return;

            try {
                const wishlist =
                    await getWishlistByProfileId(user.profileId);

                const item = wishlist.find(
                    (w) => w.gameId === Number(id)
                );

                setWishlistItemId(item?.wishlistId ?? null);
            } catch (error) {
                console.log(error);
            }
        }

        loadWishlistStatus();
    }, [user?.profileId, id]);

    useEffect(() => {
        async function loadGame() {
            try {
                console.log("ID DA ROTA:", id);

                const data = await getGameById(Number(id));

                console.log("GAME CARREGADO:", data);

                setGame(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        loadGame();
    }, [id]);

    useEffect(() => {
        async function loadPlayedStatus() {
            if (!user?.profileId || !id) return;

            try {
                const played =
                    await getPlayedByProfileId(user.profileId);

                const item = played.find(
                    (p) => p.gameId === Number(id)
                );

                setPlayedItemId(item?.playedId ?? null);
            } catch (error) {
                console.log(error);
            }
        }

        loadPlayedStatus();
    }, [user?.profileId, id]);

    if (loading) {
        return null;
    }

    if (!game) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#1F103C",
                }}
            >
                <Text style={{ color: "#fff" }}>
                    Jogo não encontrado
                </Text>
            </View>
        );
    }

    async function handleWishlist() {
        if (!user?.profileId || !game) return;

        try {
            if (wishlistItemId) {
            await removeFromWishlist(wishlistItemId);
            setWishlistItemId(null);
            } else {
            await addToWishlist({
                profileId: user.profileId,
                gameId: game.id,
            });

            const wishlist =
                await getWishlistByProfileId(user.profileId);

            const item = wishlist.find(
                (w) => w.gameId === game.id
            );

            setWishlistItemId(item?.wishlistId ?? null);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handlePlayed() {
        if (!user?.profileId || !game) return;

        try {
            if (playedItemId) {
                await removeFromPlayed(playedItemId);
                setPlayedItemId(null);
            } else {
                await addToPlayed({
                    profileId: user.profileId,
                    gameId: game.id,
                });

                const played =
                    await getPlayedByProfileId(user.profileId);

                const item = played.find(
                    (p) => p.gameId === game.id
                );

                setPlayedItemId(item?.playedId ?? null);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: "#1F103C",
            }}
        >
            {/* banner + dimensions*/}
            <View>
                <View
                    style={{
                        width: "100%",
                        height: Math.min(width * 0.48, 250),
                        overflow: "hidden",
                        backgroundColor: "#000",
                    }}
                >
                    <Image
                        source={{ uri: game.bannerPhoto }}
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        resizeMode="cover"
                    />
                </View>

                {/* botão voltar */}
                <Pressable
                    onPress={() => router.back()}
                    style={{
                        position: "absolute",
                        top: 50,
                        left: 20,
                        width: 40,
                        height: 40,
                        borderRadius: 21,
                        backgroundColor: "rgba(0, 0, 0, 0.45)",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Ionicons
                        name="chevron-back"
                        size={28}
                        color="#fff"
                        style={{
                            marginRight: 2,
                        }}
                    />
                </Pressable>
            </View>

            {/* conteúdo */}
            <View
                style={{
                    padding: 20,
                }}
            >
                {/* título */}
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 36,
                        fontFamily: Fonts.title,
                        lineHeight: 44,
                        marginBottom: 18,
                        paddingTop: 18,
                    }}
                >
                    {game.gameName}
                </Text>

                {/* card estrelas */}
                <Pressable 
                    onPress={() => {
                        setTempRating(rating);
                        setTempReview(review);
                        setIsReviewModalVisible(true);
                    }}
                    style={{
                        backgroundColor: "#321961",
                        borderRadius: 13,
                        borderWidth: 1,
                        borderColor: "#6F57D2",
                        paddingVertical: 18,
                        marginBottom: 12,

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
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: 10,
                        }}
                    >
                        {[1, 2, 3, 4, 5].map((star) => {
                            let iconName: "star" | "star-half-empty" | "star-o" = "star-o";
                            
                            if (rating >= star) {
                                iconName = "star";
                            } else if (rating >= star - 0.5) {
                                iconName = "star-half-empty";
                            }

                            return (
                                <FontAwesome
                                    key={star}
                                    name={iconName}
                                    size={38}
                                    color="#fff"
                                />
                            );
                        })}
                    </View>
                </Pressable>

                {/* card dos botões */}
                <View
                    style={{
                        flexDirection: "row",
                        gap: 12,
                        marginBottom: 35,
                    }}
                >
                    {/* controle */}
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "#321961",
                            height: 70,
                            borderRadius: 13,
                            borderWidth: 1,
                            borderColor: "#6F57D2",
                            justifyContent: "center",
                            alignItems: "center",

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
                        <Pressable onPress={handlePlayed}>
                            <Ionicons
                                name={isPlayed ? "game-controller" : "game-controller-outline"}
                                size={38}
                                color="#fff"
                            />
                        </Pressable>
                    </View>

                    {/* coração */}
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "#321961",
                            height: 70,
                            borderRadius: 13,
                            borderWidth: 1,
                            borderColor: "#6F57D2",
                            justifyContent: "center",
                            alignItems: "center",

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
                        {/* coração preenche ao clicar e adiciona em favoriteGames, clicando novamente remove e despreenche */}
                        <Pressable onPress={() => toggleFavorite(id as string)}>
                            <FontAwesome
                                name={isFavorite ? "heart" : "heart-o"}
                                size={38}
                                color="#fff"
                            />
                        </Pressable>
                    </View>

                    {/* bookmark */}
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "#321961",
                            height: 70,
                            borderRadius: 13,
                            borderWidth: 1,
                            borderColor: "#6F57D2",
                            justifyContent: "center",
                            alignItems: "center",

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
                        <Pressable onPress={handleWishlist}>
                            <FontAwesome
                                name={isInWishlist ? "bookmark" : "bookmark-o"}
                                size={38}
                                color="#fff"
                            />
                        </Pressable>
                    </View>
                </View>

                {/* título informações */}
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 23,
                        fontFamily: Fonts.body,
                        marginBottom: 16,
                    }}
                >
                    Informações
                </Text>

                {/* card informações */}
                <View
                    style={{
                        backgroundColor: "#321961",
                        borderRadius: 13,
                        padding: 22,
                        borderWidth: 1,
                        borderColor: "#6F57D2",

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
                    {/* ano e gênero */}
                    <Text
                        style={{
                            color: "#B8A9D6",
                            marginBottom: 22,
                            fontSize: 14,
                            fontFamily: Fonts.body,
                        }}
                    >
                        {game.releaseDate.substring(0, 4)} • {game.genres.join(", ")}
                    </Text>

                    {/* descrição */}
                    <Text
                        style={{
                            color: "#fff",
                            lineHeight: 28,
                            fontSize: 16,
                            fontFamily: Fonts.body,
                            textAlign: "justify",
                        }}
                    >
                        {game.description}
                    </Text>
                </View>

            </View>

            <ReviewModal
                visible={isReviewModalVisible}
                rating={tempRating}
                review={tempReview}
                onClose={() => { 
                    setTempRating(rating); 
                    setTempReview(review); 
                    setIsReviewModalVisible(false);
                }}
                onChangeRating={setTempRating}
                onChangeReview={setTempReview}
                onSubmit={() => {
                    saveReview(id as string, tempRating, tempReview);
                    setIsReviewModalVisible(false);
                }}
            />
            
        </ScrollView>
    );
}