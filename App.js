import { StatusBar } from "expo-status-bar";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import CheckBoxes from "./src/Wrappers/CheckBoxs";
import Switches from "./src/Wrappers/Switches";
import BottomSheetWrapper from "./src/Wrappers/BottomSheetWrapper";
import SkeletonWrapper from "./src/Wrappers/SkeletonWrapper";
import TouchableRippleWrapper from "./src/Wrappers/TouchableRippleWrapper";
import TouchableScaleWrapper from "./src/Wrappers/TouchableScaleWrapper";
import ActionButtonWrapper from "./src/Wrappers/ActionButtonWrapper";
import SliderButton from "./src/Components/SliderButton";
import FlipWords from "./src/Components/FlipWords";
import PINInput from "./src/Components/PINInput";
import { useRef, useState } from "react";

export default function App() {
  const [pin, setPin] = useState("");
  const pinInput = useRef();
  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.contentContainer}
      >
        <StatusBar style="light" />
        <SkeletonWrapper />
        <FlipWords style={styles.text} />
        <SliderButton />
        <PINInput
          textStyle={styles.text}
          ref={pinInput}
          value={pin}
          onChangeText={setPin}
        />
        <Button
          title="Shake Input"
          onPress={() => {
            pinInput.current?.shake();
          }}
        />
        <CheckBoxes />
        <Switches />
        <BottomSheetWrapper />
        <TouchableRippleWrapper />
        <TouchableScaleWrapper />
      </ScrollView>
      <ActionButtonWrapper />
    </View>
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
  text: {
    color: "#FFF",
  },
});
