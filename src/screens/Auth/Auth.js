import React, { Component } from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";
import ReusableInput from "../../components/UI/ReusableInput";
import ReusableButton from "../../components/UI/ReusableButton";
import background from "../../../src/assets/background.jpg";

import startTab from "../MainTabs/startMainTabs";

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateLayout);
  }

  updateLayout = dimensions => {
    this.setState({
      viewMode: dimensions.window.height > 500 ? "portrait" : "landscape"
    });
  };

  //Will remove event listener to prevent memory leaks.
  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateLayout);
  }

  loginHandler = () => {
    startTab();
  };

  render() {
    return (
      <ImageBackground source={background} style={styles.backgroundImage}>
        <View style={styles.container}>
          <ReusableButton color="#07adbc">Switch To Login</ReusableButton>
          <View
            style={
              this.state.viewMode === "portrait"
                ? styles.portraitInputContainer
                : styles.landscapeInputContainer
            }
          >
            <ReusableInput placeholder="Enter Email" />
            <ReusableInput placeholder="Enter Password" />
            <ReusableInput placeholder="Confirm Password" />
          </View>
          <ReusableButton onClick={this.loginHandler} color="#07adbc">
            Submit
          </ReusableButton>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  portraitInputContainer: {
    width: "75%"
  },
  landscapeInputContainer: {
    width: "50%"
  },
  backgroundImage: {
    width: "100%",
    flex: 1,
    opacity: 0.8
  }
});

export default AuthScreen;
