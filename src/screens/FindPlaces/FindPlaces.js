import React, { Component } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { connect } from "react-redux";
import ListLocations from "../../components/ListLocations";
import ReusableButton from "../../components/UI/ReusableButton";
import { fetchAllLocations } from "../../../store/actions/actions";

export class FindPlacesScreen extends Component {
  state = {
    locationsLoaded: false,
    buttonAnimation: new Animated.Value(1),
    locationsAnimation: new Animated.Value(0)
  };

  //See sharePlaces file for info on what code below is doing.
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent);
  }

  onNavigationEvent = event => {
    //First conditional is related to redirecting.
    if (event.type === "ScreenChangedEvent") {
      if (event.id === "willAppear") {
        this.props.fetchAllLocations();
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

  locationsLoadedAnimation = () => {
    Animated.timing(this.state.locationsAnimation, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true
    }).start();
  };

  findLocationsHandler = () => {
    Animated.timing(this.state.buttonAnimation, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        locationsLoaded: true
      });
      this.locationsLoadedAnimation();
    });
  };

  render() {
    let content = this.state.locationsLoaded ? (
      <Animated.View
        style={{
          opacity: this.state.locationsAnimation
        }}
      >
        <ListLocations
          locations={this.props.locations}
          selectedLocation={this.locationClickedHandler}
        />
      </Animated.View>
    ) : (
      <Animated.View
        style={{
          opacity: this.state.buttonAnimation
        }}
      >
        <ReusableButton onClick={this.findLocationsHandler} color="#07adbc">
          Find Locations
        </ReusableButton>
      </Animated.View>
    );

    return (
      <View
        style={
          this.state.locationsLoaded ? null : styles.buttonContainerStyling
        }
      >
        {content}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locations.locations
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllLocations: () => dispatch(fetchAllLocations())
  };
};

const styles = StyleSheet.create({
  buttonContainerStyling: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindPlacesScreen);
