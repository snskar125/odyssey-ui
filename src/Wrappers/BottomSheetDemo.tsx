import { Fragment, useRef } from "react";
import BottomSheet from "../Components/BottomSheet";
import { Button, StyleSheet, View } from "react-native";

export default function BottomSheetDemo() {
  const sheet: { current: BottomSheet } = useRef();
  return (
    <View style={styles.container}>
      <BottomSheet ref={sheet}></BottomSheet>
      <Button
        onPress={() => {
          sheet.current?.open();
        }}
        title="Bottom Sheet"
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
  },
});
