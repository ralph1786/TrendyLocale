import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { userLogOut } from "../../../store/actions/auth";

import Icon from "react-native-vector-icons/Ionicons";

export class SideMenu extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.userLogOut}>
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

const mapDispatchToProps = dispatch => {
  return {
    userLogOut: () => dispatch(userLogOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SideMenu);
