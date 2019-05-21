import React, { Component } from "react";
import { View, Button, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";

class LocationPicker extends Component {
  state = {
    pickedLocation: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get("window").width / Dimensions.get("window").height) *
        0.0122
    },
    pickedLocationMarker: false
  };

  locationPickedHandler = e => {
    let coordinates = e.nativeEvent.coordinate;
    //line below (this.map) is referencing the ref prop in MapView component.
    //The code below is animate map when a marker is placed.
    this.map.animateToRegion({
      ...this.state.pickedLocation,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude
    });
    this.setState(prevState => {
      return {
        pickedLocation: {
          ...prevState.pickedLocation,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude
        },
        pickedLocationMarker: true
      };
    });
    this.props.locationPicked({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude
    });
  };

  locateUserHandler = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          }
        };
        this.locationPickedHandler(coordsEvent);
      },
      err => {
        console.log(err);
      }
    );
  };

  render() {
    let marker = null;

    if (this.state.pickedLocationMarker) {
      marker = <MapView.Marker coordinate={this.state.pickedLocation} />;
    }

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.pickedLocation}
          style={styles.mapStyling}
          onPress={this.locationPickedHandler}
          ref={ref => (this.map = ref)}
        >
          {marker}
        </MapView>
        <View style={styles.buttonStyling}>
          <Button title="Current Location" onPress={this.locateUserHandler} />
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
  mapStyling: {
    width: "100%",
    height: 250
  },
  buttonStyling: {
    margin: 6
  }
});

export default LocationPicker;
