import { Navigation } from "react-native-navigation";
import AuthScreen from "./src/screens/Auth/Auth";
import SharePlacesScreen from "./src/screens/SharePlaces/SharePlaces";
import FindPlacesScreen from "./src/screens/FindPlaces/FindPlaces";
import LocationDetailsScreen from "./src/screens/LocationDetails/LocationDetails";
import { Provider } from "react-redux";
import storeConfig from "./store/StoreConfig";

const store = storeConfig();

//Only Registered Screens Will Show

//first argument is an unique id for the screen
//second argument is a function that returns the component
//third argument is the redux store
//fourth argument is the Provider.
Navigation.registerComponent(
  "trendy-locale.AuthScreen",
  () => AuthScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "trendy-locale.SharePlacesScreen",
  () => SharePlacesScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "trendy-locale.FindPlacesScreen",
  () => FindPlacesScreen,
  store,
  Provider
);

Navigation.registerComponent(
  "trendy-locale.LocationDetailsScreen",
  () => LocationDetailsScreen
);

//Start a App

Navigation.startSingleScreenApp({
  screen: {
    screen: "trendy-locale.AuthScreen",
    title: "Login"
  }
});
