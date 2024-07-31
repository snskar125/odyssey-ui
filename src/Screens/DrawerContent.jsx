import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import TouchableRipple from "../Components/TouchableRipple";

const Screens = [
  { title: "Home", name: "Home" },
  { title: "Character Bar", name: "CharacterBarDemo" },
  { title: "Skeleton", name: "SkeletonDemo" },
  { title: "Drawer", name: "DrawerDemo" },
];

export default function DrawerContent({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {Screens.map((screen) => (
          <TouchableRipple
            key={screen.name}
            onPress={() => {
              navigation.navigate(screen.name);
            }}
            rippleColor="#FFF"
            style={styles.button}
          >
            <Text style={styles.text}>{screen.title}</Text>
          </TouchableRipple>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    gap: 5,
  },
  contentContainer: {
    padding: 10,
    gap: 5,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 3,
    backgroundColor: "#252525",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
  },
});
