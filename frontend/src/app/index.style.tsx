import { Colors } from "../../constants/Colors"
import { StyleSheet } from "react-native";

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
    fontSize: 53,
    fontWeight: "bold",
    textTransform: "uppercase"
  },

  message: {
    color: Colors.primary
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
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  }
})