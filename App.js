import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet } from "react-native";
import CheckBoxes from "./src/Wrappers/CheckBoxs";
import Switches from "./src/Wrappers/Switches";

export default function App() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <StatusBar style="light" />
      <CheckBoxes />
      <Switches/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
  },
  contentContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 50,
    gap: 25,
  },
});
