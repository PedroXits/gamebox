//perfil
import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Image, Alert, Linking, } from "react-native";
import { AuthContext } from "@/context/AuthContext";
import { getProfileById, updateProfile } from "@/services/ProfileService";
import { ProfileResponse } from "@/models/profile/ProfileResponse";
import { router } from "expo-router";
import { Fonts } from "@/constants/fonts";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import EditProfileModal from "@/components/EditProfileModal";

export default function Profile() {
    //imagem de perfil selecionada pelo usuário

    const { user } = useContext(AuthContext);

    const [profile, setProfile] = useState<ProfileResponse | null>(null);
    const [profileImage, setProfileImage] = useState("");
    const [profileName, setProfileName] = useState("");
    const [isEditProfileModalVisible, setIsEditProfileModalVisible] = useState(false);

    useEffect(() => {
        async function loadProfile() {
            if(!user?.profileId) return;

            try {
                const data = await getProfileById(user.profileId);

                setProfile(data);
                setProfileName(data.profileName);
                setProfileImage(data.profilePhoto ?? "");

                console.log("PROFILE DATA:", data);
            } catch (error) {
                console.log(error)
            }
        }

        loadProfile();
    }, [user]);


    //abre a galeria para selecionar uma foto de perfil
    async function pickImage() {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            Alert.alert(
                "Permissão necessária",
                "É preciso permitir acesso às fotos.",
                [
                    {
                        text: "Cancelar",
                        style: "cancel",
                    },
                    {
                        text: "Abrir Ajustes",
                        onPress: () => Linking.openSettings(),
                    },
                ]
            );
            return;
        }
        
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    }

    //mock de jogos
    const playedGames = [
        {
            id: "1",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cobg1j.jpg",
        },
        {
            id: "2",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coaarl.jpg",
        },
        {
            id: "3",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cobebu.jpg",
        },
        {
            id: "4",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cob9dh.jpg",
        },
        {
            id: "5",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cob9kr.jpg",
        },
        {
            id: "6",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co62ao.jpg",
        },
    ];

    const favoriteGames = [
        {
            id: "1",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1rbu.jpg",
        },
        {
            id: "2",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coa1gr.jpg",
        },
        {
            id: "3",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1ir3.jpg",
        },
        {
            id: "4",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coaih8.jpg",
        },
        {
            id: "5",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9gam.jpg",
        },
        {
            id: "6",
            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1q1f.jpg",
        },
    ];

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
                        width: 110,
                        height: 110,
                        borderRadius: 70,
                        backgroundColor: "#fff",
                        justifyContent: "center",
                        alignItems: "center",
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
                        <Ionicons
                            name="person-outline"
                            size={56}
                            color="#000"
                        />
                    )}
                </View>

                {/* nome do perfil */}
                <Text
                    style={{
                        color: "#fff",
                        fontFamily: Fonts.body,
                        fontSize: 21,
                        marginBottom: 2,         
                    }}
                >
                    {profileName}
                </Text>

                {/* username */}
                <Text
                    style={{
                        color: "#726292",
                        fontFamily: Fonts.body,
                        fontSize: 17,                        
                    }}
                >
                    @{user?.username}
                </Text>

                {/* botão editar perfil */}
                <Pressable
                    onPress={() => setIsEditProfileModalVisible(true)}
                    style={{
                        backgroundColor: "#321961",
                        borderRadius: 13,
                        borderWidth: 1,
                        borderColor: "#6F57D2",
                        marginTop: 16,
                        paddingHorizontal: 140,
                        paddingVertical: 8,

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
                            fontSize: 15,
                        }}
                    >
                        Editar perfil
                    </Text>
                </Pressable>
            </View>

            {/* linha divisória */}
            <View
                style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "rgba(255,255,255,0.2)",
                    marginTop: -24,
                }}
            />
            
            {/* seção Jogados */}
            <View
                style={{
                    marginTop: 36,
                }}
            >
                {/* título */}
                <Text
                    style={{
                        color: "#fff",
                        fontFamily: Fonts.body,
                        fontSize: 18,
                        marginBottom: 12,
                    }}
                >
                    Jogados
                </Text>

                {/* sem jogos jogados */}
                {playedGames.length === 0 ? (
                    <Text
                        style={{
                            color: "#726292",
                            fontFamily: Fonts.body,
                            fontSize: 16,
                        }}
                    >
                        Nenhum jogo ainda
                    </Text>
                ) : (
                    <>
                        {/* cards jogos */}
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginBottom: 8,
                                gap: 9,
                                marginLeft: -5,
                            }}
                        >
                            {/* com jogos jogados */}
                            {playedGames.slice(0, 4).map((game) => (
                                <Image
                                    key={game.id}
                                    source={{ uri: game.image }}
                                    style={{
                                        width: 87,
                                        height: 128,
                                        borderRadius: 8,
                                    }}
                                    resizeMode="cover"
                                />
                            ))}
                        </View>

                        {/* botão Ver mais */}
                        <Pressable
                            onPress={() => router.push("/list/played")}
                            style={{
                                alignSelf: "flex-end",
                            }}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    fontFamily: Fonts.body,
                                    fontSize: 15,
                                }}
                            >
                                Ver mais
                            </Text>
                        </Pressable>
                    </>
                )}
            </View>

            {/* seção Favoritos */}
            <View
                style={{
                    marginTop: 30,
                }}
            >
                {/* título */}
                <Text
                    style={{
                        color: "#fff",
                        fontFamily: Fonts.body,
                        fontSize: 18,
                        marginBottom: 12,
                    }}
                >
                    Favoritos
                </Text>

                {/* sem jogos favoritados */}
                {favoriteGames.length === 0 ? (
                    <Text
                        style={{
                            color: "#726292",
                            fontFamily: Fonts.body,
                            fontSize: 16,
                        }}
                    >
                        Nenhum jogo ainda
                    </Text>
                ) : (
                    <>
                        {/* cards jogos */}
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginBottom: 8,
                                gap: 9,
                                marginLeft: -5,
                            }}
                        >
                            {/* com jogos favoritados */}
                            {favoriteGames.slice(0, 4).map((game) => (
                                <Image
                                    key={game.id}
                                    source={{ uri: game.image }}
                                    style={{
                                        width: 87,
                                        height: 128,
                                        borderRadius: 8,
                                    }}
                                    resizeMode="cover"
                                />
                            ))}
                        </View>

                        {/* botão Ver mais */}
                        <Pressable
                            onPress={() => router.push("/list/favorites")}
                            style={{
                                alignSelf: "flex-end",
                            }}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    fontFamily: Fonts.body,
                                    fontSize: 15,
                                }}
                            >
                                Ver mais
                            </Text>
                        </Pressable>
                    </>
                )}
            </View>

            <EditProfileModal
                visible={isEditProfileModalVisible}
                profileImage={profileImage}
                profileName={profileName}
                onClose={() => setIsEditProfileModalVisible(false)}
                onPickImage={pickImage}
                onEditName={async (newName) => {
                    if (!user?.profileId) return;

                    try {
                        const updatedProfile = await updateProfile(user.profileId, {
                        profileName: newName,
                        profilePhoto: profileImage || null,
                        });

                        setProfileName(updatedProfile.profileName);
                        setProfileImage(updatedProfile.profilePhoto ?? "");
                        setProfile(updatedProfile);
                        setIsEditProfileModalVisible(false);
                    } catch (error) {
                        console.log(error);
                    }
                }}
            />
            
        </View>
    );
}