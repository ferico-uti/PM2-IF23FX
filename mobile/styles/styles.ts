import { Colors } from "@/constants/color";
import { StyleSheet } from "react-native";

// buat styles CSS
export const styles = StyleSheet.create({
  title: {
    backgroundColor: "#a51c31",
    color: Colors.white,
    width: "100%",
    textAlign: "center",
    padding: 10,
    fontSize: 20,
  },
  frame: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.white,
    // height: 500
  },
  fab: {
    position: "absolute",
    margin: 10,
    right: 5,
    bottom: 5,
    backgroundColor: Colors.sponsor,
    color: Colors.white,
    borderRadius: 50,
  },
  card: {
    width: "95%",
    margin: 10,
    backgroundColor: Colors.white,
  },

  card_button_primary: {
    backgroundColor: Colors.sponsor,
    color: Colors.white,
  },

  card_button_secondary: {
    backgroundColor: "transparent",
    color: Colors.sponsor,
  },

  component_area : {
    width: "100%",
    marginBottom: 10
  }
});