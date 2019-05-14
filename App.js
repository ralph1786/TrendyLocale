import { Navigation } from "react-native-navigation";
import AuthScreen from "./src/screens/Auth/Auth";

//Register Screens will only show

//first argument is an unique id for the screen
Navigation.registerComponent("trendy-locale.AuthScreen", () => AuthScreen);

//Start a App

Navigation.startSingleScreenApp({
  screen: {
    screen: "trendy-locale.AuthScreen",
    title: "Login"
  }
});
