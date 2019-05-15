import React, { Component } from "react";
import { View, Text, Button } from "react-native";

import startTab from "../MainTabs/startMainTabs";

class AuthScreen extends Component {
  loginHandler = () => {
    startTab();
  };

  render() {
    return (
      <View>
        <Text>Auth Screen</Text>
        <Button title="Login" onPress={this.loginHandler} />
      </View>
    );
  }
}

export default AuthScreen;
