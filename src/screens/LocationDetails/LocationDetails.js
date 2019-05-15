import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const LocationDetailsScreen = props => {
  return (
    <View style={styles.containerStyling}>
      <View>
        <Image
          source={props.selectedLocation.image}
          style={styles.imageStyling}
        />
        <Text style={styles.locationName}>{props.selectedLocation.name}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={props.deleteLocation}>
          <View style={styles.deleteIcon}>
            <Icon size={25} name="ios-trash" color="red" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyling: {
    margin: 30
  },
  imageStyling: {
    width: "100%",
    height: 175
  },
  locationName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
    margin: 10
  },
  deleteIcon: {
    alignItems: "center"
  }
});

export default LocationDetailsScreen;
