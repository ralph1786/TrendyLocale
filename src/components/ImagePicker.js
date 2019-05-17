import React, { Component } from "react";
import { View, StyleSheet, Image, Button } from "react-native";
import imagePreview from "../assets/bora-bora-3023437.jpg";

class ImagePicker extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageMapPlaceholder}>
          <Image source={imagePreview} style={styles.imagePreview} />
        </View>
        <View style={styles.buttonStyling}>
          <Button title="Choose Image" />
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
  },
  imagePreview: {
    width: "100%",
    height: "100%"
  }
});

export default ImagePicker;
