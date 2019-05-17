import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const ReusableButton = props => {
  return (
    <TouchableOpacity onPress={props.onClick}>
      <View style={[styles.button, { backgroundColor: props.color }]}>
        <Text style={styles.text}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 6,
    borderRadius: 20
  },
  text: {
    color: "white"
  }
});

export default ReusableButton;
