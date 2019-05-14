import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image
} from "react-native";

const LocationCard = props => {
  return (
    <TouchableHighlight onPress={props.locationClicked}>
      <View style={styles.locationCardStyling}>
        <Image
          source={props.locationImage}
          style={styles.locationImageStyling}
        />
        <Text>{props.locationName}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  locationCardStyling: {
    width: "100%",
    padding: 10,
    margin: 5,
    backgroundColor: "#4286f4",
    flexDirection: "row",
    alignItems: "center"
  },
  locationImageStyling: {
    marginRight: 10,
    width: 50,
    height: 50
  }
});

export default LocationCard;
