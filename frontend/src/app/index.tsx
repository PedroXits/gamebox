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
          <Pressable style={styles.button} onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.buttonText}>Começar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
