import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

export class SideMenu extends Component {
  render() {
    return (
      <TouchableOpacity>
        <View style={styles.container}>
          <Icon
            name="ios-log-out"
            size={25}
            color="#21b8ef"
            style={styles.iconStyling}
          />
          <Text style={styles.textStyling}>Logout</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "20%",
    marginLeft: "10%"
  },
  iconStyling: {
    marginRight: 10
  },
  textStyling: {
    fontSize: 18
  }
});

export default SideMenu;
