import React, { Component } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import LocationCard from "./LocationCard";

export class ListLocations extends Component {
  onPressLocationHandler = key => {
    this.props.selectedLocation(key);
  };

  render() {
    return (
      <View>
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
  locationContainer: {
    width: "100%"
  }
});

export default ListLocations;
