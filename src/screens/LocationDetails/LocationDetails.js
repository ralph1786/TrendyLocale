import React, { Component } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { removeLocation } from "../../../store/actions/actions";

class LocationDetailsScreen extends Component {
  //Selected location is passProps in the FindPlaces file.
  deleteLocationHandler = () => {
    this.props.deleteLocation(this.props.selectedLocation.key);
    this.props.navigator.pop({
      animated: true,
      animationType: "fade"
    });
  };

  render() {
    return (
      <View style={styles.containerStyling}>
        <View>
          <Image
            source={this.props.selectedLocation.image}
            style={styles.imageStyling}
          />
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
