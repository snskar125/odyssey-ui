import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet } from "react-native";
import CheckBoxes from "./src/Wrappers/CheckBoxs";
import Switches from "./src/Wrappers/Switches";
import BottomSheetWrapper from "./src/Wrappers/BottomSheetWrapper";
import SkeletonWrapper from "./src/Wrappers/SkeletonWrapper";
import TouchableRippleWrapper from "./src/Wrappers/TouchableRippleWrapper";

export default function App() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <StatusBar style="light" />
      <SkeletonWrapper />
      <CheckBoxes />
      <Switches />
      <BottomSheetWrapper />
      <TouchableRippleWrapper />
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
