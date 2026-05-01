import React from "react";
import { Pressable, Text, TextInput, View, Image } from "react-native";
import { styles } from "./styles";
import { Link, router } from "expo-router"; //Atalho automático do login para a home apenas para teste, pois ainda não temos a integração. É só clicar no botão de entrar que será direcionado para a home.
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function Login() {
  return (
    <View style={styles.page}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Bem-Vindo</Text>
        <Text style={styles.p}>Faça parte do Gameboxd</Text>
      </View>

      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../../../assets/images/logo.png")}></Image>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.mainContent}>
          <Text style={styles.loginText}>Login</Text>
          <View style={styles.inputsContainer}>
            <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="rgba(128, 128, 128, 0.7)"></TextInput>
            <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="rgba(128, 128, 128, 0.7)"></TextInput>
            <Text style={styles.forgotPass}>Esqueceu sua senha?</Text>
          </View>
          <Pressable style={styles.loginButton} onPress={() => router.replace("/(tabs)/home")}> 
            <Text style={styles.loginButtonText}>Entrar</Text>
          </Pressable>
           <View style={styles.olwcontainer}>
            <View style={styles.line} />
            <Text style={styles.text}>logar com</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.authContainer}>
            <View style={styles.iconContainer}>
              <FontAwesome name="google" size={36} color="#000" />
            </View>
            <View style={styles.iconContainer}>
              <FontAwesome name="facebook" size={36} color="#000" />
            </View>
            <View style={styles.iconContainer}>
              <Ionicons name="logo-apple" size={38} color="#000" />
            </View>
          </View>
          <Text style={styles.signUpContainer}>
            Não tem uma conta? <Link href="/register" style={styles.singUp}>Cadastre-se</Link>
          </Text>
        </View>
      </View>
    </View>
  );
}
