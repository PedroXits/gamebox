import React from "react";
import { View } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false,
        //remove os nomes abaixo dos ícones da barra de navegação
        tabBarShowLabel: false,

        tabBarStyle: {
          backgroundColor: "#000",
          borderTopWidth: 0,
          height: 85,
          paddingTop: 5,
        },

        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#888",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          href: "/home",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={26} 
                color={color} 
              />

              {focused && (
                <View
                  style={{
                    width: 24,
                    height: 3,
                    borderRadius: 2,
                    backgroundColor: "#fff",
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons 
                name={focused ? "search" : "search-outline"} 
                size={26} 
                color={color}
              />

              {focused && (
                <View
                  style={{
                    width: 24,
                    height: 3,
                    borderRadius: 2,
                    backgroundColor: "#fff",
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons 
                name={focused ? "bookmark" : "bookmark-outline"} 
                size={26} 
                color={color} 
              />

              {focused && (
                <View
                  style={{
                    width: 24,
                    height: 3,
                    borderRadius: 2,
                    backgroundColor: "#fff",
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons 
                name={focused ? "person" : "person-outline"} 
                size={26} 
                color={color} 
              />

              {focused && (
                <View
                  style={{
                    width: 24,
                    height: 3,
                    borderRadius: 2,
                    backgroundColor: "#fff",
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}