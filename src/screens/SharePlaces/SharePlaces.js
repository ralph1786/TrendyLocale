import React, { Component } from "react";
import { View } from "react-native";
import AddPlaceInput from "../../components/AddPlaceInput";
import { connect } from "react-redux";
import { addLocation } from "../../../store/actions/actions";

export class SharePlacesScreen extends Component {
  /*The constructor and the setOnNavigatorEvent is used
    to check for an event, in this case the press of the side menu icon.
    The onNavigationEvent method is checking to the see the type of event and
    also checking to see which button or icon was pressed by checking for the
    event.id.
    The id is passed to the icon in the startMainTab file.
  */
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

  addLocationHandler = locationName => {
    this.props.addLocation(locationName);
  };

  render() {
    return (
      <View>
        <AddPlaceInput addLocation={this.addLocationHandler} />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addLocation: locationName => dispatch(addLocation(locationName))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SharePlacesScreen);
