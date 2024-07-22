import { StyleSheet, View } from "react-native";
import { useState } from "react";
import Switch from "../Components/Switch";

export default function Switches() {
  const [value, setValue] = useState(false);
  return (
    <View style={styles.row}>
      <Switch
        value={value}
        onPress={() => {
          setValue(!value);
        }}
      />
      <Switch
        activeTrackColor="#505050"
        bounce={false}
        value={value}
        onPress={() => {
          setValue(!value);
        }}
      />
      <Switch
        inActiveTrackColor="#505050"
        activeTrackColor="#FFF"
        activeSwitchColor="#505050"
        animate={false}
        value={value}
        onPress={() => {
          setValue(!value);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 25,
  },
});
