import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import FlipWords from "../Components/FlipWords";
import TouchableRipple from "../Components/TouchableRipple";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <FlipWords words={["ODYSSEY UI", "ODYSSEY UI"]} style={styles.text} />
      <TouchableRipple
        onPress={navigation.openDrawer}
        rippleColor="#FFF"
        style={styles.button}
      >
        <Text style={styles.buttonText}>Browse Components</Text>
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  text: {
    color: "#FFF",
  },
  button: {
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "#252525",
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
