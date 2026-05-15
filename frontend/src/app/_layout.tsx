// organiza a navegação

import React, { useContext } from "react";

import { Stack } from "expo-router";

import { useFonts } from "expo-font";

import { GamesProvider }
  from "@/context/GamesContext";

import { AdminGamesProvider }
  from "@/context/AdminGamesContext";

import {
  AuthContext,
  AuthProvider
} from "@/context/AuthContext";

function Routes() {

  const {
    signed,
    loading
  } = useContext(AuthContext);

  // enquanto carrega auth
  if (loading) {
    return null;
  }

  return (

    <Stack screenOptions={{ headerShown: false }}>
      {
        signed ? (
          // usuário logado
          <Stack.Screen name="(tabs)" />
        ) : (
          // usuário não logado
          <Stack.Screen name="(auth)" />
        )
      }
    </Stack>
  );
}

export default function Layout() {

  const [fontsLoaded] = useFonts({
    Koulen:
      require("../assets/fonts/Koulen-Regular.ttf"),

    Imprima:
      require("../assets/fonts/Imprima-Regular.ttf"),

    LeagueSpartanBold:
      require("../assets/fonts/LeagueSpartan-Bold.ttf"),

    GeistMonoBlackItalic:
      require("../assets/fonts/GeistMono-BlackItalic.ttf"),
  });

  // enquanto carrega fontes
  if (!fontsLoaded) {
    return null;
  }

  return (

    <AuthProvider>
      <AdminGamesProvider>
        <GamesProvider>
          <Routes />
        </GamesProvider>
      </AdminGamesProvider>
    </AuthProvider>
  );
}