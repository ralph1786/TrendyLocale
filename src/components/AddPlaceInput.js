import React, { Component } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";

export class AddPlaceInput extends Component {
  state = {
    locationName: ""
  };

  changeHandler = name => {
    this.setState({
      locationName: name
    });
  };

  locationSubmitHandler = () => {
    if (this.state.locationName.trim() === "") {
      return;
    }
    this.props.addLocation(this.state.locationName);
  };

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          value={this.state.locationName}
          onChangeText={this.changeHandler}
          placeholder="enter location"
          style={styles.textInputStyling}
        />
        <Button
          title="Add"
          style={styles.buttonStyling}
          onPress={this.locationSubmitHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center"
  },
  textInputStyling: {
    width: "70%"
  },
  buttonStyling: {
    width: "30%"
  }
});

export default AddPlaceInput;
