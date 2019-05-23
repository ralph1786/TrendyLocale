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
import { resetRedirect } from "../../../store/actions/actions";

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

  resetStateHandler = () => {
    this.setState({
      locationName: "",
      locationCoords: {
        value: null,
        valid: false
      },
      image: {
        value: null,
        valid: false
      }
    });
  };

  onNavigationEvent = event => {
    if (event.type === "ScreenChangedEvent") {
      if (event.id === "willAppear") {
        this.props.resetRedirect();
      }
    }
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
    this.resetStateHandler();
    /*The two function below are being called using ref,
    see the components below. The resetStateHandler are inside their respective
    component, but we can access them using ref. 
    */
    this.imagePicker.resetStateHandler();
    this.locationPicker.resetStateHandler();
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

  componentDidUpdate() {
    if (this.props.redirect) {
      this.props.navigator.switchToTab({ tabIndex: 0 });
    }
  }

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
          <UserImagePicker
            onChosenImage={this.chosenImageHandler}
            ref={ref => (this.imagePicker = ref)}
          />
          <LocationPicker
            locationPicked={this.locationPickedHandler}
            ref={ref => (this.locationPicker = ref)}
          />
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
    isLoading: state.ui.isLoading,
    redirect: state.locations.redirect
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLocation: (locationName, location, image) =>
      dispatch(addLocation(locationName, location, image)),
    resetRedirect: () => dispatch(resetRedirect())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SharePlacesScreen);
