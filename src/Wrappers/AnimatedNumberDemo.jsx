import { Button, StyleSheet, TextInput, View } from "react-native";
import AnimatedNumber from "../Components/AnimatedNumber";
import { useState } from "react";

export default function AnimatedNumberDemo() {
  const [value, setValue] = useState("");
  const [number, setNumber] = useState("0000");
  return (
    <View style={styles.container}>
      <AnimatedNumber style={styles.text} number={number} />
      <TextInput
        placeholder="Enter Number"
        placeholderTextColor={"#B3B3B3"}
        value={value}
        style={styles.input}
        onChangeText={(t) => {
          if (/^(\d+(\.\d*)?|\.\d+)$/.test(t) || t === "") setValue(t);
        }}
        keyboardType="number-pad"
      />
      <Button
        title="Set Number"
        onPress={() => {
          setNumber(value);
          setValue("");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#101010",
    gap: 15,
  },
  input: {
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#252525",
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: "#FFF",
    width: "50%",
    textAlign: "center",
    marginTop: 10,
    backgroundColor: "#252525",
  },
  text: {
    color: "#FFF",
  },
});
