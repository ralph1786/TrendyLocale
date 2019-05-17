import React, { Component } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { addLocation } from "../../../store/actions/actions";
import ReusableHeaderText from "../../components/UI/ReusableHeaderText";
import AddPlaceInput from "../../components/AddPlaceInput";
import ImagePicker from "../../components/ImagePicker";
import LocationPicker from "../../components/LocationPicker";

export class SharePlacesScreen extends Component {
  /*The constructor and the setOnNavigatorEvent is used
    to check for an event, in this case the press of the side menu icon.
    The onNavigationEvent method is checking to the see the type of event and
    also checking to see which button or icon was pressed by checking for the
    event.id.
    The id is passed to the icon in the startMainTab file.
  */

  state = {
    locationName: ""
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent);
  }

  onNavigationEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "toggleSideMenu") {
        this.props.navigator.toggleDrawer({
          side: "left",
          animated: true
        });
      }
    }
  };

  addLocationHandler = () => {
    if (this.state.locationName.trim() !== "") {
      this.props.addLocation(this.state.locationName);
    }
  };

  onChangeTextHandler = value => {
    this.setState({
      locationName: value
    });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <ReusableHeaderText>Share Your Favorite Locale</ReusableHeaderText>
          <ImagePicker />
          <LocationPicker />
          <AddPlaceInput
            locationName={this.state.locationName}
            changeHandler={this.onChangeTextHandler}
          />
          <View style={styles.buttonStyling}>
            <Button title="Share Location" onPress={this.addLocationHandler} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  buttonStyling: {
    margin: 6
  }
});

const mapDispatchToProps = dispatch => {
  return {
    addLocation: locationName => dispatch(addLocation(locationName))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SharePlacesScreen);
