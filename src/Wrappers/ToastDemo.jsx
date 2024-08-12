import { Button, Image, StyleSheet, View } from "react-native";
import ToastProvider from "../Components/ToastProvider";
import { useRef } from "react";

export default function ToastDemo() {
  const Toast = useRef();
  return (
    <ToastProvider containerStyle={{ backgroundColor: "#101010" }} ref={Toast}>
      <View style={styles.container}>
        <Button
          onPress={() => {
            Toast.current?.toast({
              icon: (
                <Image
                  style={{ width: 25, height: 25, resizeMode: "contain" }}
                  source={{
                    uri: "https://raiserecruiting.com/wp-content/uploads/2023/05/blue-checkmark-circle.png",
                  }}
                />
              ),
              message: "Toast Message",
            });
          }}
          title="Toast"
        />
      </View>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#101010",
    gap: 15,
  },
});
