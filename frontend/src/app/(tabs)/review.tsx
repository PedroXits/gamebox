// import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native"
// import { AntDesign } from "@expo/vector-icons"


// export default function Review() {
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
          
//             <Text style={{ color: "white", marginTop: 12, lineHeight: 22, fontSize: 14 }}>
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