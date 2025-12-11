import { Colors } from "@/constants/color";
import { StyleSheet } from "react-native";

// buat styles CSS
export const styles = StyleSheet.create({
  title: {
    backgroundColor: Colors.sponsor,
    color: Colors.white,
    width: "100%",
    textAlign: "center",
    padding: 10,
    fontSize: 20,
  },
  frame: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Colors.white,
  },
  header_area: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    backgroundColor: Colors.sponsor,
    padding: 10,
  },

  header_title: {
    fontSize: 20,
    color: Colors.white,
  },

  fab: {
    position: "absolute",
    margin: 10,
    right: 5,
    bottom: 5,
    backgroundColor: "#f9cf00",
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

  component_area: {
    width: "100%",
    marginBottom: 10,
  },

  error_area: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  error: {
    color: "#ff0000",
    fontSize: 12,
    marginVertical: 5,
    marginHorizontal: 0,
    paddingLeft: 5,
  },

  back_button: {
    position: "absolute",
    left: 10,
    color: Colors.white,
  },

  // dropdown
  dropdown: {
    margin: 0,
    height: 50,
    backgroundColor: "white",
    borderRadius: 0,
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#a3a3a3",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 1.41,

    // elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
