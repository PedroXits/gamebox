import { Colors } from "../../../constants/Colors";
import { Fonts } from "@/constants/fonts";
import { StyleSheet } from "react-native";

const paddingHorizontal = 30
const paddingVertical = 60

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingVertical: paddingVertical,
    backgroundColor: Colors.secondary
  },

  textContainer: {
    marginTop: 100,
    marginBottom: 40,
    paddingHorizontal: paddingHorizontal
  },

  title: {
    fontSize: 58,
    fontFamily: Fonts.title,
    color: Colors.white,
    textTransform: "uppercase",
  },

  p: {
    color: Colors.white,
    fontFamily: Fonts.body,
    marginTop: -10,
  },

  logoContainer: {
    top: 230,
    left: 250,
    zIndex: 999,
    position: "absolute",
  },

  logo: {
    width: 150,
    height: 150,
  },

  contentContainer: {
    height: "100%",
    paddingVertical: 30,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  mainContent: {
    paddingHorizontal: paddingHorizontal
  },

  loginText: {
    fontSize: 30,
    fontFamily: Fonts.login,
    textTransform: "uppercase",
    marginBottom: 30,
    marginTop: 10,
  },

  inputsContainer: {
    gap: 20,
    display: "flex",
    flexDirection: "column",
    marginBottom: 40

  },

  input: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#00000051",
  },

  forgotPass: {
    textAlign: "right",
    color: Colors.primary
  },

  loginButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 100,
    backgroundColor: Colors.primary
  },

  loginButtonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 20,
    fontFamily: Fonts.login,
  },

  olwcontainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },

  text: {
    color: "#888",
  },

  authContainer: {
    gap: 20,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 20,
  },

  iconContainer: {
    padding: 5,
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#00000051"
  },
  
  icon: {
    width: "100%",
    height: "100%"
  },

  signUpContainer: {
    textAlign: "center"
  },


  singUp: {
    color: Colors.primary 
  }
})