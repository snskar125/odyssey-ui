import { StyleSheet, Text } from "react-native";
import TouchableScale from "../Components/TouchableScale";

export default function TouchableScaleWrapper() {
  return (
    <TouchableScale style={styles.button}>
      <Text style={styles.buttonText}>Bounce Effect</Text>
    </TouchableScale>
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
