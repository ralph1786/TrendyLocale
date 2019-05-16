import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";

const startTabs = () => {
  Promise.all([
    Icon.getImageSource("md-map", 25),
    Icon.getImageSource("ios-share-alt", 25),
    Icon.getImageSource("ios-menu", 25)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "trendy-locale.FindPlacesScreen",
          label: "Find Location",
          title: "Find Location",
          icon: sources[0],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                title: "Menu",
                id: "toggleSideMenu"
              }
            ]
          }
        },
        {
          screen: "trendy-locale.SharePlacesScreen",
          label: "Share Location",
          title: "Share Location",
          icon: sources[1],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                title: "Menu",
                id: "toggleSideMenu"
              }
            ]
          }
        }
      ],
      drawer: {
        left: {
          screen: "trendy-locale.SideMenuScreen"
        }
      }
    });
  });
};

export default startTabs;
