import React from "react";
import { Pressable, Text, TextInput, View, Image, Alert } from "react-native";
import { styles } from "./styles";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Login() {

  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleLogin() {
    
    //validação front
    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Digite seu e-mail.");
      return;
    }

    if (!password.trim()) {
      setPasswordError("Digite sua senha.");
      return;
    }

    if (!email.includes("@") ||
        !email.includes(".")
      ) {
        setEmailError("Digite um e-mail válido.");
        return;
      }

    try {
      const response = await login({ 
        email, 
        password 
      });

      if (response.role === "ADMIN") {
        router.replace("/admin");
      } else {
        router.replace("/(tabs)/home");
      }

    } catch (error: any) {
      
      console.log(error);

      //credenciais inválidas
      if (error?.response?.status === 401) {
        Alert.alert(
          "Login inválido",
          "E-mail ou senha inválidos."
        );
        return;
      }

      //erro genérico (back desligado/sem internet etc)
      Alert.alert(
        "Erro de conexão",
        "Verifique sua internet e tente novamente."
      )
    }
  }

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
            <TextInput 
              style={styles.input} 
                placeholder="E-mail" 
                placeholderTextColor="rgba(128, 128, 128, 0.7)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            {emailError ? (
              <Text style={styles.errorText}>
                {emailError}
              </Text>
            ) : null}
            
            <TextInput 
              style={styles.input} 
                placeholder="Senha" 
                placeholderTextColor="rgba(128, 128, 128, 0.7)"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {passwordError ? (
              <Text style={styles.errorText}>
                {passwordError}
              </Text>
            ) : null}

            <Text style={styles.forgotPass}>Esqueceu sua senha?</Text>
          </View>
          <Pressable style={styles.loginButton} onPress={handleLogin}> 
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
