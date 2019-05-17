import React from "react";
import { Text, StyleSheet } from "react-native";

const ReusableHeaderText = props => {
  return (
    <Text {...props} style={[styles.textHeader, props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: "5%"
  }
});

export default ReusableHeaderText;
