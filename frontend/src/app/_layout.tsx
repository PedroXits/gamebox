// organiza a navegação
import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Koulen: require("../assets/fonts/Koulen-Regular.ttf"),
    Imprima: require("../assets/fonts/Imprima-Regular.ttf"),
    LeagueSpartanBold: require("../assets/fonts/LeagueSpartan-Bold.ttf"),
    GeistMonoBlackItalic: require("../assets/fonts/GeistMono-BlackItalic.ttf"),
  });
  
  //enquanto carrega
  if (!fontsLoaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}