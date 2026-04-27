import React from "react";
import { Pressable, Text, TextInput, View, Image } from "react-native";
import { styles } from "./styles";
import { Link } from "expo-router";

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
          <Pressable style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </Pressable>
           <View style={styles.olwcontainer}>
            <View style={styles.line} />
            <Text style={styles.text}>logar com</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.authContainer}>
            <View style={styles.iconContainer}>
              <Image style={styles.icon} source={require("../../../assets/images/googleIcon.png")}></Image>
            </View>
            <View style={styles.iconContainer}>
              <Image style={styles.icon} source={require("../../../assets/images/facebookIcon.png")}></Image>
            </View>
            <View style={styles.iconContainer}>
              <Image style={styles.icon} source={require("../../../assets/images/appleIcon.png")}></Image>
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
