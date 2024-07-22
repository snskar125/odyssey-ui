import { StyleSheet, View } from "react-native";
import CheckBox from "../Components/CheckBox";
import { useState } from "react";

export default function CheckBoxes() {
  const [value, setValue] = useState(false);
  return (
    <View style={styles.row}>
      <CheckBox
        value={value}
        onPress={() => {
          setValue(!value);
        }}
      />
      <CheckBox
        activeBorderColor="#505050"
        inActiveBorderColor="#505050"
        activeBackgroundColor="#505050"
        inActiveBackgroundColor="#505050"
        bounce={false}
        value={value}
        onPress={() => {
          setValue(!value);
        }}
      />
      <CheckBox
        animate={false}
        activeBackgroundColor="transparent"
        activeBorderColor="#FFF"
        inActiveBorderColor="#FFF"
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
