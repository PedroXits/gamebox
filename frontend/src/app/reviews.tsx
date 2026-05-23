// //tela de avaliações
// import React from "react";
// import { View, Text, Image, ScrollView, Pressable, } from "react-native";

// import { router } from "expo-router";
// import { Ionicons, FontAwesome } from "@expo/vector-icons";
// import { Fonts } from "@/constants/fonts";

// export default function Reviews() {

//     //mock reviews
//     const reviews = [
//         {
//             id: "1",
//             gameName: "Life is Strange Remastered",
//             year: "2015",
//             gamePhoto: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1r8e.jpg",
//             rating: 4.5,
//             comment: "Fiquei muito gag jogando... piriririririripiririririririririrpororororororororasdkjaskdjaksjdaksdjksasjhdjhvsririrpororororororororasdkjaskdjaksjdapiririririririririrpororororororororasdkjaskdjaksjdaksdjksasjhdjhvsksdjksasjhdjhs",
//             isFavorite: true,
//         },
//         {
//             id: "2",
//             gameName: "The Legend of Zelda: Breath of the Wild",
//             year: "2020",
//             gamePhoto: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co3p2d.jpg",
//             rating: 5,
//             comment: "Fiquei muito gag jogando... piririririririririrpororororororororasdkjaskdjaksjdapiririririririririrpororororororororasdkjaskdjaksjdaksdjksasjhdjhvsksdjksasjhdjhs",
//             isFavorite: true,
//         },
//         {
//             id: "3",
//             gameName: "The Last of Us Part II Remastered",
//             year: "2024",
//             gamePhoto: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coa1gr.jpg",
//             rating: 4,
//             comment: "Fiquei muito gag jogando... piririririririririrpororororororororasdkjaskdjaksjdaksdjksasjpiririririririririrpororororovrorororasdkjaskdjaksjdaksdjksasjhdjhvsvhdjhvs",
//             isFavorite: false,
//         },
//     ];

//     return (
//         <View style={{ flex: 1, backgroundColor: "#1F103C" }}>

//             <View 
//             style={{
//                 paddingTop: 60,
//                 paddingBottom: 20,
//                 paddingHorizontal: 20,
//                 borderBottomWidth: 1,
//                 borderBottomColor: "#7474744f",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "center",
//             }}
//         >
//             {/* voltar */}
//             <Pressable
//                 onPress={() => router.back()}
//                 style={{
//                     position: "absolute",
//                     left: 20,
//                     top: 60,
//                 }}
//             >
//                 <Ionicons
//                     name="chevron-back"
//                     size={28}
//                     color="#fff"
//                 />
//             </Pressable>

//             <Text
//                 style={{
//                     color: "#fff",
//                     fontFamily: Fonts.body,
//                     fontSize: 28,
//                 }}
//             >
//                 Reviews
//             </Text>
//         </View>
//         </View>

//     );
// }











// // import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native"
// // import { AntDesign } from "@expo/vector-icons"

// // export default function Review() {

// //   return (
// //     <View style={{ flex: 1, backgroundColor: "#1F103C" }}>
      
// //         <View 
// //             style={{
// //                 paddingTop: 60,
// //                 paddingBottom: 20,
// //                 paddingHorizontal: 20,
// //                 borderBottomWidth: 1,
// //                 borderBottomColor: "#7474744f",
// //                 flexDirection: "row",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //             }}
// //         >

// //             <TouchableOpacity 
// //                 style={{
// //                     position: "absolute",
// //                     left: 20,
// //                     paddingTop: 60
// //                 }}
// //             >
// //             <AntDesign
// //                 name="left" 
// //                 size={22} 
// //                 color="white" 
// //             />
// //             </TouchableOpacity>

// //             <Text 
// //                 style={{
// //                     color: "white",
// //                     fontSize: 28,
// //                     fontWeight: "600"
// //                 }}
// //             >
// //                 Reviews
// //             </Text>
// //         </View>

// //             <ScrollView 
// //                 contentContainerStyle={{
// //                     padding: 20,
// //                     borderBottomWidth: 1,
// //                     borderBottomColor: "#7474744f"
// //                 }}
// //             >
            
// //                 <View 
// //                     style={{
// //                         flexDirection: "row",
// //                         justifyContent: "space-between",
// //                         gap: 16 
// //                     }}
// //                 >
            
// //                     <View style={{ flex: 1 }}>
// //                         <Text 
// //                             style={{
// //                                 color: "white",
// //                                 fontSize: 18, 
// //                                 fontWeight: "600", 
// //                                 lineHeight: 24
// //                             }}
// //                         >
// //                             The Last Of Us Part II Remastered
// //                         </Text>

// //                         <Text 
// //                             style={{
// //                                 color: "#ffffff80", 
// //                                 fontSize: 14, 
// //                                 marginTop: 2
// //                             }}
// //                         >
// //                             2024
// //                         </Text>
                    
// //                         <Text 
// //                             style={{
// //                                 color: "white", 
// //                                 marginTop: 12,
// //                                 lineHeight: 22, 
// //                                 fontSize: 14
// //                             }}
// //                         >
// //                             Fiquei muito gag jogando... piririririririririrpororororororororasdkjaskdjaksjdaksdjksasjhdjhsFiquei muito gag jogando... piririririririririrpororororororororasdkjaskdjaksjdaksdjksasjhdjhs

// //                         </Text>
// //                     </View>

// //                     <Image
// //                         source={{ uri: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cobg1j.jpg" }}
// //                         style={{
// //                             width: 90,
// //                             height: 130,
// //                             borderRadius: 8 
// //                         }}
// //                         resizeMode="cover"
// //                     />
// //                 </View>

// //             </ScrollView>
        
// //     </View>
// //   )
// // }