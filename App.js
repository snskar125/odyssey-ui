import { Fragment } from "react";
import Navigation from "./src/Navigation";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <Fragment>
      <StatusBar backgroundColor={"#FFF"} barStyle="dark-content" />
      <Navigation />
    </Fragment>
  );
}
