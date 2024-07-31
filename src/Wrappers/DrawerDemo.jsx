import { Fragment, memo, useRef } from "react";
import Drawer from "../Components/Drawer";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Links = ["Home", "Services", "Projects", "Contact Us", "Login"];

const DrawerContent = memo(({ onClose }) => (
  <View style={styles.drawerContent}>
    <Image
      style={styles.logo}
      source={{ uri: "https://odysseyui.site/assets/logo-DoSXDzfy.png" }}
    />
    {Links.map((link) => (
      <TouchableOpacity key={link} onPress={onClose} activeOpacity={0.75}>
        <Text style={styles.link}>・ {link}</Text>
      </TouchableOpacity>
    ))}
  </View>
));

export default function DrawerDemo() {
  const drawer = useRef();
  return (
    <Fragment>
      <Drawer
        drawerContent={
          <DrawerContent
            onClose={() => {
              drawer.current?.close();
            }}
          />
        }
        ref={drawer}
      >
        <View style={styles.container}>
          <Button
            title="Open Drawer"
            onPress={() => {
              drawer.current?.open();
            }}
          />
        </View>
      </Drawer>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  drawerContent: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    gap: 10,
  },
  logo: {
    width: 180,
    height: 45,
    resizeMode: "contain",
  },
  link: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
