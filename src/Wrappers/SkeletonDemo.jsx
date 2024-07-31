import { View, StyleSheet, SafeAreaView } from "react-native";
import Skeleton from "../Components/Skeleton";

export default function SkeletonDemo() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Skeleton style={styles.mini} />
          <Skeleton style={styles.detail} />
        </View>
        <View style={styles.row}>
          <Skeleton style={styles.card} />
          <Skeleton style={styles.card} />
        </View>
        <View style={styles.row}>
          <Skeleton style={styles.card} />
          <Skeleton style={styles.card} />
        </View>
        <View style={styles.row}>
          <Skeleton style={styles.card} />
          <Skeleton style={styles.card} />
        </View>
        <View style={styles.row}>
          <Skeleton style={styles.card} />
          <Skeleton style={styles.card} />
        </View>
        <View style={styles.row}>
          <Skeleton style={styles.card} />
          <Skeleton style={styles.card} />
        </View>
        <View style={styles.row}>
          <Skeleton style={styles.card} />
          <Skeleton style={styles.card} />
        </View>
        <View style={styles.row}>
          <Skeleton style={styles.card} />
          <Skeleton style={styles.card} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#101010",
    gap: 15,
    padding: 15,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  card: {
    flex: 1,
    borderRadius: 5,
    height: 100,
  },
  mini: {
    width: 50,
    borderRadius: 5,
  },
  detail: {
    flex: 1,
  },
});
