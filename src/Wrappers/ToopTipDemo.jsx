import { Image, StyleSheet, Text, View } from "react-native";
import ToolTip from "../Components/ToolTip";

export default function ToolTipDemo() {
  return (
    <View style={styles.container}>
      <ToolTip
        content={
          <View style={styles.tooltipContainer}>
            <Text style={styles.text}>ODYSSEY UI</Text>
          </View>
        }
      >
        <Image
          style={styles.image}
          source={{ uri: "https://www.odysseyui.site/logo.png" }}
        />
      </ToolTip>
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
  image: {
    width: 250,
    height: 50,
    resizeMode: "contain",
  },
  tooltipContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#3B81F6",
    borderRadius: 3,
    width: 300,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
});
