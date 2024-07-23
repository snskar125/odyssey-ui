import { StyleSheet, Text } from "react-native";
import TouchableRipple from "../Components/TouchableRipple";

export default function TouchableRippleWrapper() {
  return (
    <TouchableRipple rippleColor="#FFF" style={styles.button}>
      <Text style={styles.buttonText}>Ripple Effect</Text>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: "#252525",
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "500",
  },
});
