import React, { useRef, useState, useEffect }from "react";
import { ScrollView, View, Image, Text, FlatList, Dimensions } from "react-native";

import { GameList } from "@/components/GameList";
import { Fonts } from "@/constants/fonts";

export default function Home() {
    const { width } = Dimensions.get("window"); //pega a largura do celular e ocupa a tela inteira

    const mockGames = [
        { 
            id: "tlou",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coa1gr.jpg",
        },
        {
            id: "gow",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cobkt6.jpg",
        },
        {
            id: "silksong",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cobebu.jpg",
        },
        {
            id: "rdr2",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1q1f.jpg",
        },
    ];

    // banners / lista de imagens do carrossel
    const banners = [
        "https://s1.pearlcdn.com/cd/brand/metatag/2025/09/25/78b56ee739920250925065827388.jpg",
        mockGames[0].image,
        mockGames[1].image,
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList<string>>(null);

    //autoplay
    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % banners.length; //loop infinito

            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });

            setCurrentIndex(nextIndex);
        }, 4000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    return(
        <ScrollView style={{ flex: 1, backgroundColor: "#1E0F3A"}}>

            {/* banner do topo */}
            <View style={{ paddingBottom: 20 }}>
                <View>

                    {/* carrossel */}
                    <FlatList
                        ref={flatListRef}
                        data={banners}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(_, index) => index.toString()}

                        onMomentumScrollEnd={(event: any) => {
                            const index = Math.round(
                                event.nativeEvent.contentOffset.x / (width - 40)
                            );
                            setCurrentIndex(index);
                        }}

                        renderItem={({ item }) => (
                            <Image
                                source={{ uri: item }}
                                style={{ 
                                    width: width - 40, 
                                    height: 200,
                                }}
                            />
                        )}
                    />

                {/* titulo do banner */}
                <Text
                    style={{
                        position: "absolute",
                        bottom: 20,
                        width: "100%",
                        textAlign: "center",
                        color: "#fff",
                        fontSize: 20,
                        fontFamily: Fonts.title,
                        textShadowColor: "#000",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 4,
                    }}
                >
                    DESTAQUES
                </Text>

                {/* bolinhas do banner */}
                <View
                    style={{
                        position: "absolute",
                        bottom: 12,
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 6,
                    }}
                >
                    {banners.map((_, index) => (
                        <View
                            key={index}
                            style={{
                                width: 9,
                                height: 9,
                                borderRadius: 10,
                                backgroundColor: index === currentIndex ? "#fff" : "#888",
                            }}
                        />
                    ))}
                </View>

            </View>
        </View>
            
            {/* listas dos jogos */}
            <View style={{ paddingHorizontal: 20 }}>
                <GameList title="Populares" games={mockGames}/>
                <GameList title="Tiro porrada e bomba" games={mockGames}/>
                <GameList title="Lançamentos" games={mockGames}/>
                
                <GameList title="Aventura" games={mockGames}/>
                <GameList title="Esporte" games={mockGames}/>
            </View>
            
        </ScrollView>
    );
}