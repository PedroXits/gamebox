import { Colors } from "../constants/Colors"
import { StyleSheet } from "react-native";
import { Fonts } from "@/constants/fonts";

export const styles = StyleSheet.create({
  container: {
    display:"flex",
    flexDirection: "column",
    gap: 80,
    paddingVertical: 60,
    paddingHorizontal: 30,
    backgroundColor: Colors.white 
  },

  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },

  logo: {
    height: 200,
    width: 200
  },

  actionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 60
  },

  title: {
    color: Colors.primary,
    fontSize: 58,
    fontFamily: Fonts.title,
    textTransform: "uppercase"
  },

  message: {
    color: Colors.primary,
    fontFamily: Fonts.body,
    fontSize: 15,
    marginTop: -10,
    marginLeft: 5,
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  button: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 100,
    backgroundColor: Colors.primary
  },

  buttonText: {
    color: Colors.text,
    fontSize: 22,
    fontFamily: Fonts.login,
    textAlign: "center"
  }
})