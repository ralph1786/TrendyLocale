import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { removeLocation } from "../../../store/actions/actions";
import MapView from "react-native-maps";

class LocationDetailsScreen extends Component {
  //SelectedLocation is obtained from passProps in the FindPlaces file.

  state = {
    chosenLocationCoords: {
      latitude: this.props.selectedLocation.location.latitude,
      longitude: this.props.selectedLocation.location.longitude,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get("window").width / Dimensions.get("window").height) *
        0.0122
    }
  };

  deleteLocationHandler = () => {
    this.props.deleteLocation(this.props.selectedLocation.key);
    this.props.navigator.pop({
      animated: true,
      animationType: "fade"
    });
  };

  render() {
    let marker = null;

    if (this.state.chosenLocationCoords) {
      marker = <MapView.Marker coordinate={this.state.chosenLocationCoords} />;
    }
    return (
      <View style={styles.containerStyling}>
        <View>
          <Image
            source={this.props.selectedLocation.image}
            style={styles.imageStyling}
          />
          <MapView
            region={this.state.chosenLocationCoords}
            style={styles.mapStyling}
          >
            {marker}
          </MapView>
          <Text style={styles.locationName}>
            {this.props.selectedLocation.name}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.deleteLocationHandler}>
            <View style={styles.deleteIcon}>
              <Icon size={25} name="ios-trash" color="red" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyling: {
    margin: 30
  },
  imageStyling: {
    width: "100%",
    height: 175
  },
  locationName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
    margin: 10
  },
  deleteIcon: {
    alignItems: "center"
  },
  mapStyling: {
    width: "100%",
    height: 175
  }
});

const mapDispatchToProps = dispatch => {
  return {
    deleteLocation: key => dispatch(removeLocation(key))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LocationDetailsScreen);
