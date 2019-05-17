import React from "react";
import { TextInput, StyleSheet } from "react-native";

const ReusableInput = props => {
  return <TextInput style={styles.input} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 4,
    margin: 7,
    backgroundColor: "#eee"
  }
});

export default ReusableInput;
