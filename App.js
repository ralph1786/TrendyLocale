import { Navigation } from "react-native-navigation";
import AuthScreen from "./src/screens/Auth/Auth";
import SharePlacesScreen from "./src/screens/SharePlaces/SharePlaces";
import FindPlacesScreen from "./src/screens/FindPlaces/FindPlaces";

//Register Screens will only show

//first argument is an unique id for the screen
Navigation.registerComponent("trendy-locale.AuthScreen", () => AuthScreen);
Navigation.registerComponent(
  "trendy-locale.SharePlacesScreen",
  () => SharePlacesScreen
);
Navigation.registerComponent(
  "trendy-locale.FindPlacesScreen",
  () => FindPlacesScreen
);

//Start a App

Navigation.startSingleScreenApp({
  screen: {
    screen: "trendy-locale.AuthScreen",
    title: "Login"
  }
});
