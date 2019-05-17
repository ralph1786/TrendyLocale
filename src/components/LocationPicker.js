import React, { Component } from "react";
import { Text, View, Button, StyleSheet } from "react-native";

export class LocationPicker extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageMapPlaceholder}>
          <Text>Map</Text>
        </View>
        <View style={styles.buttonStyling}>
          <Button title="Current Location" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  imageMapPlaceholder: {
    borderColor: "blue",
    borderWidth: 1,
    width: "75%",
    height: 150,
    backgroundColor: "#eee"
  },
  buttonStyling: {
    margin: 6
  }
});

export default LocationPicker;
