import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Screens/Home";
import CharacterBarDemo from "./Wrappers/CharacterBarDemo/CharacterBarDemo";
import DrawerContent from "./Screens/DrawerContent";
import SkeletonDemo from "./Wrappers/SkeletonDemo";
import DrawerDemo from "./Wrappers/DrawerDemo";
import BottomSheetDemo from "./Wrappers/BottomSheetDemo";
import AnimatedNumberDemo from "./Wrappers/AnimatedNumberDemo";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <DrawerContent {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="AnimatedNumberDemo" component={AnimatedNumberDemo} />
    <Drawer.Screen name="BottomSheetDemo" component={BottomSheetDemo} />
    <Drawer.Screen name="CharacterBarDemo" component={CharacterBarDemo} />
    <Drawer.Screen name="SkeletonDemo" component={SkeletonDemo} />
    <Drawer.Screen name="DrawerDemo" component={DrawerDemo} />
  </Drawer.Navigator>
);

export default function Navigation() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
