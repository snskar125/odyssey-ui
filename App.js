import { Fragment } from "react";
import Navigation from "./src/Navigation";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <Fragment>
      <StatusBar style="light"/>
      <Navigation />
    </Fragment>
  );
}
