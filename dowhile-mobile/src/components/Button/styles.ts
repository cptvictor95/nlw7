import { StyleSheet } from "react-native";
import { FONTS } from "../../theme";

export const styles = StyleSheet.create({
  button: {
    height: 48,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.BOLD,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  icon: {
    marginRight: 12,
  },
});
