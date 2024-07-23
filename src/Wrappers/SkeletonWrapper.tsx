import { StyleSheet, View } from "react-native";
import Skeleton from "../Components/Skeleton";

export default function SkeletonWrapper() {
  return (
    <View style={styles.container}>
      <Skeleton style={styles.mini} />
      <Skeleton style={styles.bar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
  mini: {
    height: 50,
    width: 50,
  },
  bar: {
    flex: 1,
  },
});
