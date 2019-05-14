import React, { Component } from "react";
import { StyleSheet, View, TextInput, Button, FlatList } from "react-native";
import beautifulImage from "./src/assets/bora-bora-3023437.jpg";
import { connect } from "react-redux";
import LocationCard from "./src/components/LocationCard";
import LocationDetails from "./src/components/LocationDetails";
import {
  addLocation,
  removeLocation,
  selectedLocation
} from "./store/actions/actions";

class App extends Component {
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

  onPressLocationHandler = key => {
    this.props.selectedLocation(key);
  };

  deleteLocation = () => {
    this.props.removeLocation();
  };

  render() {
    //Code Below is being done by the FlatList Component
    // const listLocations = this.state.locations.map((location, index) => (
    //   <LocationCard
    //     key={index}
    //     locationName={location}
    //     locationClicked={() => this.onPressLocationHandler(index)}
    //   />
    // ));

    return (
      <View style={styles.container}>
        <LocationDetails deleteLocation={this.deleteLocation} />
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
        <FlatList
          style={styles.locationContainer}
          data={this.props.locations}
          renderItem={info => (
            <LocationCard
              locationName={info.item.name}
              locationClicked={() => this.onPressLocationHandler(info.item.key)}
              locationImage={info.item.image}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "flex-start",
    marginTop: 60,
    alignItems: "center",
    width: 300
  },
  inputContainer: {
    // flex: 1,
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
  },
  locationContainer: {
    width: "100%"
  }
});

const mapStateToProps = state => {
  return {
    locations: state.locations.locations
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLocation: name => dispatch(addLocation(name)),
    removeLocation: () => dispatch(removeLocation()),
    selectedLocation: key => dispatch(selectedLocation(key))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
