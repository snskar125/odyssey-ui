import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import CheckBoxes from "../Wrappers/CheckBoxs";
import Switches from "../Wrappers/Switches";
import BottomSheetWrapper from "../Wrappers/BottomSheetWrapper";
import SkeletonWrapper from "../Wrappers/SkeletonWrapper";
import TouchableRippleWrapper from "../Wrappers/TouchableRippleWrapper";
import TouchableScaleWrapper from "../Wrappers/TouchableScaleWrapper";
import ActionButtonWrapper from "../Wrappers/ActionButtonWrapper";
import SliderButton from "../Components/SliderButton";
import FlipWords from "../Components/FlipWords";
import PINInput from "../Components/PINInput";
import { useRef, useState } from "react";
import CharacterBar from "../Components/CharacterBar";
import TextGenerateEffect from "../Components/TextGenerateEffect";
import TypeWriterEffect from "../Components/TypeWriterEffect";

export default function Home() {
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
        <TextGenerateEffect style={styles.text}>
          Unleash the magic of motion with our React Native components – where
          every interaction tells a story. Dive into seamless animations that
          breathe life into your app!
        </TextGenerateEffect>
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
        <TypeWriterEffect style={styles.text}>
          Unleash the magic of motion with our React Native components – where
          every interaction tells a story. Dive into seamless animations that
          breathe life into your app!
        </TypeWriterEffect>
        <CheckBoxes />
        <Switches />
        <BottomSheetWrapper />
        <TouchableRippleWrapper />
        <TouchableScaleWrapper />
      </ScrollView>
      <ActionButtonWrapper />
      <CharacterBar containerStyle={styles.characterBar} />
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
  characterBar: {
    position: "absolute",
    right: 5,
    top: 120,
  },
});
