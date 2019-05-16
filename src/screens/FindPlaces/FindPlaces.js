import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import ListLocations from "../../components/ListLocations";

export class FindPlacesScreen extends Component {
  //See sharePlaces file for info on what code below is doing.
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

  //Following code pushes a new screen and passes
  //the information of location clicked through passProps(props)
  locationClickedHandler = key => {
    const chosenLocation = this.props.locations.find(
      location => location.key === key
    );
    this.props.navigator.push({
      screen: "trendy-locale.LocationDetailsScreen",
      title: chosenLocation.name,
      passProps: {
        selectedLocation: chosenLocation
      }
    });
  };

  render() {
    return (
      <View>
        <ListLocations
          locations={this.props.locations}
          selectedLocation={this.locationClickedHandler}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locations.locations
  };
};

export default connect(mapStateToProps)(FindPlacesScreen);
