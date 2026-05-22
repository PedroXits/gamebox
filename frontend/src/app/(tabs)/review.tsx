// import { View, Text, Image, ScrollView, TouchableOpacity, Pressable } from "react-native"
// import { AntDesign, FontAwesome } from "@expo/vector-icons"
// import { useState } from "react";


// export default function Review() {

//   // Eu copiei a lógica das estrelas do arquivo do [game], não tá funcionando, mas deixei pq pelo menos já fica ai :p

//   const [rating, setRating] = useState(0);
//   const [review, setReview] = useState("");
//   const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
//   const [tempRating, setTempRating] = useState<number>(0);
//   const [tempReview, setTempReview] = useState("");
    

//   return (
//     <View style={{ flex: 1, backgroundColor: "#1F103C" }}>
      
//       <View style={{
//         paddingTop: 60,
//         paddingBottom: 20,
//         paddingHorizontal: 20,
//         borderBottomWidth: 1,
//         borderBottomColor: "#7474744f",
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",
//       }}>
//         <TouchableOpacity style={{ position: "absolute", left: 20, paddingTop: 60 }}>
//           <AntDesign name="left" size={22} color="white" />
//         </TouchableOpacity>
//         <Text style={{ color: "white", fontSize: 28, fontWeight: "600" }}>
//           Reviews
//         </Text>
//       </View>

//       <ScrollView contentContainerStyle={{ padding: 20, borderBottomWidth: 1, borderBottomColor: "#7474744f" }}>
        
//         <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 16 }}>
          
//           <View style={{ flex: 1 }}>
//             <Text style={{ color: "white", fontSize: 18, fontWeight: "600", lineHeight: 24 }}>
//               The Last Of Us Part II Remastered
//             </Text>
//             <Text style={{ color: "#ffffff80", fontSize: 14, marginTop: 2 }}>
//               2024
//             </Text>
//             <Pressable 
//                 onPress={() => {
//                     setTempRating(rating);
//                     setTempReview(review);
//                     setIsReviewModalVisible(true);
//                 }}
//                 style={{
//                     paddingVertical: 10,
//                 }}
//             >
//                 <View
//                   style={{
//                       flexDirection: "row",
//                       justifyContent: "flex-start",
//                       gap: 10,
//                   }}
//                 >
//                   {[1, 2, 3, 4, 5].map((star) => {
//                       let iconName: "star" | "star-half-empty" | "star-o" = "star-o";
                      
//                       if (rating >= star) {
//                           iconName = "star";
//                       } else if (rating >= star - 0.5) {
//                           iconName = "star-half-empty";
//                       }

//                       return (
//                           <FontAwesome
//                               key={star}
//                               name={iconName}
//                               size={28}
//                               color="#fff"
//                           />
//                       );
//                     })}
//                 </View>
//             </Pressable>
          
//             <Text style={{ color: "white", lineHeight: 22, fontSize: 14 }}>
//               Fiquei muito gag jogando... piririririririririrpororororororororasdkjaskdjaksjdaksdjksasjhdjhs
//             </Text>
//           </View>

//           <Image
//             source={{ uri: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cobg1j.jpg" }}
//             style={{ width: 90, height: 130, borderRadius: 8 }}
//             resizeMode="cover"
//           />
//         </View>

//       </ScrollView>
//     </View>
//   )
// }