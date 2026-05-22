import React, { useContext, useState } from "react";
import { Link, router } from "expo-router";
import { Pressable, Text, TextInput, View, Image, Alert } from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "@/context/AuthContext";

export default function Register() {

  const { register } = useContext(AuthContext);
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState(""); 
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  async function handleRegister() {

    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!username.trim()) {
      setUsernameError("Digite um username.");
      return;
    }
    
    if (!email.trim()) {
      setEmailError("Digite seu e-mail.");
      return;
    }

    if (!email.includes("@") ||
        !email.includes(".")
      ) {
        setEmailError("Digite um e-mail válido.");
        return;
      }

    if (!password.trim()) {
      setPasswordError("Digite sua senha.");
      return;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Confirme sua senha.");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("As senhas não coincidem.");
      return;
    }

    try {
      const response = await register({
        username,
        email,
        password
      });

      if (response.role === "ADMIN") {
        router.replace("/admin");
      } else {
        router.replace("/(tabs)/home");
      }
    } catch (error) {
      console.log(error);

      //erro genérico (back desligado/sem internet etc)
      Alert.alert(
        "Erro ao cadastrar",
        "Não foi possível criar sua conta."
      );
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
          <Text style={styles.loginText}>Criar conta</Text>
          <View style={styles.inputsContainer}>
            <TextInput 
              style={styles.input}
                placeholder="Username" 
                placeholderTextColor="rgba(128, 128, 128, 0.7)"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
            />
            {usernameError ? (
              <Text style={styles.errorText}>{usernameError}</Text>
            ) : null}

            <TextInput 
              style={styles.input} 
                placeholder="E-mail" 
                placeholderTextColor="rgba(128, 128, 128, 0.7)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}

            <TextInput 
              style={styles.input} 
                placeholder="Senha" 
                placeholderTextColor="rgba(128, 128, 128, 0.7)"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}

            <TextInput 
              style={styles.input} 
                placeholder="Confirmar senha" 
                placeholderTextColor="rgba(128, 128, 128, 0.7)"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
            />
            {confirmPasswordError ? (
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            ) : null}

          </View>
          <Pressable style={styles.loginButton} onPress={handleRegister}>
            <Text style={styles.loginButtonText}>Cadastrar</Text>
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
          <Text style={styles.loginContainer}>
            Já tem uma conta? <Link href="/login" style={styles.login}>Entrar</Link>
          </Text>
        </View>
      </View>
    </View>
  );
}
