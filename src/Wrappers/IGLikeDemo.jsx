import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import InstagramLikeEffect from "../Components/InstagramLikeEffect";

export default function IGLikeDemo() {
  return (
    <View style={styles.container}>
      <InstagramLikeEffect>
        <Image
          style={styles.post}
          source={{
            uri: "https://images.unsplash.com/photo-1722412878204-d13c6210a1b9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
        />
      </InstagramLikeEffect>
      <Text style={styles.text}>Double Tap to Like</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 25,
  },
  post: {
    width: 300,
    height: 200,
    resizeMode: "contain",
    borderRadius: 5,
  },
  text: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
});
