import { StyleSheet, View } from "react-native";
import ActionButton from "../Components/ActionButton";

export default function ActionButtonWrapper() {
  return <ActionButton containerStyle={style.container} />;
}

const style = StyleSheet.create({
  container: {
    position: "absolute",
    left: 25,
    bottom: 25,
  },
});
