import React from "react";
import { Pressable, Text, View, Image } from "react-native";
import { styles } from "./index.style";
import { router } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/images/logo.png")}></Image>
      </View>
      <View style={styles.actionContainer}>
        <View>
          <Text style={styles.title}>Gameboxd</Text>
          <Text style={styles.message}>
            Sua vida gamer, catalogada.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          {/* login */}
          <Pressable style={styles.button} onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.buttonText}>Começar</Text>
          </Pressable>

          {/* acesso temporário à home */}
          <Pressable style={[styles.button, { marginTop: 12, opacity: 0.8 }]} onPress={() => router.push("/home")}>
            <Text style={styles.buttonText}>Home (teste)</Text>
          </Pressable>

          {/* painel administrativo temporário */}
          <Pressable style={[styles.button, { marginTop: 12, opacity: 0.8 }]} onPress={() => router.push("/admin")}>
            <Text style={styles.buttonText}>Admin</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
