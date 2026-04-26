import React from "react";
import { Pressable, Text, TextInput, View, Image } from "react-native";
import { styles } from "./styles";
import { Link } from "expo-router";

export default function Login() {
  return (
    <View style={styles.page}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.p}>welcome to gameboxd</Text>
      </View>

      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../../../assets/images/logo.png")}></Image>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.mainContent}>
          <Text style={styles.loginText}>Login</Text>
          <View style={styles.inputsContainer}>
            <TextInput style={styles.input} placeholder="Email"></TextInput>
            <TextInput style={styles.input} placeholder="Password"></TextInput>
            <Text style={styles.forgotPass}>Forgot Password</Text>
          </View>
          <Pressable style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>
           <View style={styles.olwcontainer}>
            <View style={styles.line} />
            <Text style={styles.text}>Or login with</Text>
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
            Don't have an account? <Link href="/register" style={styles.singUp}>Sing Up</Link>
          </Text>
        </View>
      </View>
    </View>
  );
}
