import React from "react";
import { TextInput, StyleSheet } from "react-native";

const ReusableInput = props => {
  return (
    <TextInput
      {...props}
      style={[
        styles.input,
        props.style,
        !props.isValid && props.touched ? styles.isInValid : null
      ]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 4,
    margin: 7,
    backgroundColor: "#eee"
  },
  isInValid: {
    backgroundColor: "#f48a84",
    borderColor: "red",
    borderWidth: 1.5
  }
});

export default ReusableInput;
