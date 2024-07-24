import { StyleSheet, View } from "react-native";
import ActionButton from "../Components/ActionButton";

export default function ActionButtonWrapper() {
  return (
    <View style={style.container}>
      <ActionButton />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    position: "absolute",
    right: 25,
    bottom: 25,
  },
});
