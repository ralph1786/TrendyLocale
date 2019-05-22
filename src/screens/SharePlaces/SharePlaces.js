import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { addLocation } from "../../../store/actions/actions";
import ReusableHeaderText from "../../components/UI/ReusableHeaderText";
import AddPlaceInput from "../../components/AddPlaceInput";
import UserImagePicker from "../../components/UserImagePicker";
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
    locationName: "",
    locationCoords: {
      value: null,
      valid: false
    },
    image: {
      value: null,
      valid: false
    }
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
      this.props.addLocation(
        this.state.locationName,
        this.state.locationCoords.value,
        this.state.image.value
      );
    }
  };

  onChangeTextHandler = value => {
    this.setState({
      locationName: value
    });
  };

  locationPickedHandler = location => {
    this.setState({
      locationCoords: {
        value: location,
        valid: true
      }
    });
  };

  chosenImageHandler = image => {
    this.setState(prevState => {
      return {
        ...prevState,
        image: {
          value: image,
          valid: true
        }
      };
    });
  };

  render() {
    const conditionalButton =
      this.state.locationName &&
      this.state.locationCoords.valid &&
      this.state.image.valid ? (
        <Button title="Share Location" onPress={this.addLocationHandler} />
      ) : (
        <Text style={styles.disabled}>Share Location</Text>
      );
    let submitButton = conditionalButton;

    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />;
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <ReusableHeaderText>Share Your Favorite Locale</ReusableHeaderText>
          <UserImagePicker onChosenImage={this.chosenImageHandler} />
          <LocationPicker locationPicked={this.locationPickedHandler} />
          <AddPlaceInput
            locationName={this.state.locationName}
            changeHandler={this.onChangeTextHandler}
          />
          <View style={styles.buttonStyling}>{submitButton}</View>
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
  },
  disabled: {
    color: "#b2b0b0",
    fontSize: 18
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLocation: (locationName, location, image) =>
      dispatch(addLocation(locationName, location, image))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SharePlacesScreen);
