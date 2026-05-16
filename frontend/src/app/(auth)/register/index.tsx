import React, { useContext, useState } from "react";
import { Pressable, Text, TextInput, View, Image } from "react-native";
import { styles } from "./styles";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "@/context/AuthContext";

export default function Register() {

  const { register } = useContext(AuthContext);

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  
  const [ password, setPassword ] = useState(""); 

  const [ confirmPassword, setConfirmPassword ] = useState("");

  async function handleRegister() {
    
    if (password !== confirmPassword) {
      console.log("Senhas diferentes");

      return;
    }

    try {
      await register({username, email, password});
    } catch (error) {
      console.log(error);
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
