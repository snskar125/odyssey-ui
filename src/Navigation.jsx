import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Screens/Home";
import CharacterBarDemo from "./Wrappers/CharacterBarDemo/CharacterBarDemo";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator screenOptions={{ headerShown: false }}>
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="CharacterBarDemo" component={CharacterBarDemo} />
  </Drawer.Navigator>
);

export default function Navigation() {
  return <NavigationContainer>
    <DrawerNavigator/>
  </NavigationContainer>;
}
