import { StyleSheet, View } from "react-native";

export default function ToolTipDemo() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#101010",
    gap: 15,
  },
});
