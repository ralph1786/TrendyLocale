import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const ReusableButton = props => {
  const content = (
    <View
      style={[
        styles.button,
        { backgroundColor: props.color },
        props.disabled ? styles.disabled : null
      ]}
    >
      <Text style={props.disabled ? styles.disabledText : styles.text}>
        {props.children}
      </Text>
    </View>
  );

  if (props.disabled) {
    return content;
  }

  return <TouchableOpacity onPress={props.onClick}>{content}</TouchableOpacity>;
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 6,
    borderRadius: 20
  },
  text: {
    color: "white"
  },
  disabled: {
    backgroundColor: "#bfbdbd"
  },
  disabledText: {
    color: "#777676"
  }
});

export default ReusableButton;
