// tela home/feed
import React from "react";
import { ScrollView, View, Image, Text } from "react-native";
import { GameList } from "@/components/GameList";

export default function Home() {
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

    return(
        <ScrollView style={{ flex: 1, backgroundColor: "#1e0f3a" }}>

            {/* banner */}
            <View style={{ padding: 20 }}>
                <Image
                    source={{
                        uri: "https://s1.pearlcdn.com/cd/brand/metatag/2025/09/25/78b56ee739920250925065827388.jpg",
                    }}
                    style={{
                        width: "100%",
                        height: 200,
                        borderRadius: 12,
                    }}
                />

                <Text
                    style={{
                        color: "#fff",
                        marginTop: 10,
                        fontSize: 18,
                        fontWeight: "bold",
                    }}
                >
                    Destaques
                </Text>
            </View>

            


        </ScrollView>
    );
}