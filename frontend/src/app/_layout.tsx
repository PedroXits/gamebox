// organiza a navegação
import React, { useContext } from "react";
import { Stack, Redirect } from "expo-router";
import { useFonts } from "expo-font";

import { GamesProvider } from "@/context/GamesContext";
import { AdminGamesProvider } from "@/context/AdminGamesContext";
import { AuthContext } from "@/contexts/AuthContext";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Koulen: require("../assets/fonts/Koulen-Regular.ttf"),
    Imprima: require("../assets/fonts/Imprima-Regular.ttf"),
    LeagueSpartanBold: require("../assets/fonts/LeagueSpartan-Bold.ttf"),
    GeistMonoBlackItalic: require("../assets/fonts/GeistMono-BlackItalic.ttf"),
  });

  // pega estado de autenticação global
  const { signed, loading } = useContext(AuthContext);

  // enquanto carrega fontes ou auth
  if (!fontsLoaded || loading) {
    return null;
  }

  return (
    <AdminGamesProvider>
      <GamesProvider>

        {/* controla acesso geral do app */}
        {signed ? (
          <Stack screenOptions={{ headerShown: false }} />
        ) : (
          <Redirect href="/(auth)/login" />
        )}

      </GamesProvider>
    </AdminGamesProvider>
  );
}