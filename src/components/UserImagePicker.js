import React, { Component } from "react";
import { View, StyleSheet, Image, Button } from "react-native";
import ImagePicker from "react-native-image-picker";

class UserImagePicker extends Component {
  state = {
    chosenImage: null
  };

  chosenImageHandler = () => {
    ImagePicker.showImagePicker({ title: "Choose An Image" }, res => {
      if (res.didCancel) {
        console.log("User Cancelled");
      } else if (res.error) {
        console.log("error", res.error);
      } else {
        this.setState({
          chosenImage: { uri: res.uri }
        });
        this.props.onChosenImage({
          uri: res.uri,
          base64: res.data
        });
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageMapPlaceholder}>
          <Image source={this.state.chosenImage} style={styles.imagePreview} />
        </View>
        <View style={styles.buttonStyling}>
          <Button title="Choose Image" onPress={this.chosenImageHandler} />
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

export default UserImagePicker;
