import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import ReusableInput from "../../components/UI/ReusableInput";
import ReusableButton from "../../components/UI/ReusableButton";
import background from "../../../src/assets/background.jpg";
import validate from "../../validations/validations";
import { connect } from "react-redux";
import { userAuth } from "../../../store/actions/actions";

import startTab from "../MainTabs/startMainTabs";

class AuthScreen extends Component {
  state = {
    logInMode: true,
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
    inputControls: {
      email: {
        value: "",
        isValid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        isValid: false,
        validationRules: {
          minLength: 8
        },
        touched: false
      },
      confirmPassword: {
        value: "",
        isValid: false,
        validationRules: {
          isEqualTo: "password"
        },
        touched: false
      }
    }
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
    const authData = {
      email: this.state.inputControls.email.value,
      password: this.state.inputControls.password.value
    };
    this.props.userAuth(authData);
    startTab();
  };

  onChangeHandler = (key, value) => {
    //Code below makes sure that password and confirm password match
    let connectedValue = {};
    if (this.state.inputControls[key].validationRules.isEqualTo) {
      const equalControl = this.state.inputControls[key].validationRules
        .isEqualTo;
      const equalValue = this.state.inputControls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        isEqualTo: equalValue
      };
    }

    this.setState(prevState => {
      return {
        inputControls: {
          ...prevState.inputControls,
          [key]: {
            ...prevState.inputControls[key],
            value: value,
            isValid: validate(
              value,
              prevState.inputControls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };

  changeAuthModeHandler = () => {
    this.setState({
      logInMode: !this.state.logInMode
    });
  };

  render() {
    let content = this.state.logInMode ? null : (
      <ReusableInput
        placeholder="Confirm Password"
        value={this.state.inputControls.confirmPassword.value}
        onChangeText={value => this.onChangeHandler("confirmPassword", value)}
        isValid={this.state.inputControls.confirmPassword.isValid}
        touched={this.state.inputControls.confirmPassword.touched}
        secureTextEntry
      />
    );

    return (
      <ImageBackground source={background} style={styles.backgroundImage}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <ReusableButton color="#07adbc" onClick={this.changeAuthModeHandler}>
            {this.state.logInMode ? "Switch to Sign Up" : "Switch to Login"}
          </ReusableButton>
          <View
            style={
              this.state.viewMode === "portrait"
                ? styles.portraitInputContainer
                : styles.landscapeInputContainer
            }
          >
            <ReusableInput
              placeholder="Enter Email"
              value={this.state.inputControls.email.value}
              onChangeText={value => this.onChangeHandler("email", value)}
              isValid={this.state.inputControls.email.isValid}
              touched={this.state.inputControls.email.touched}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
            <ReusableInput
              placeholder="Enter Password"
              value={this.state.inputControls.password.value}
              onChangeText={value => this.onChangeHandler("password", value)}
              isValid={this.state.inputControls.password.isValid}
              touched={this.state.inputControls.password.touched}
              secureTextEntry
            />
            {content}
          </View>
          <ReusableButton
            onClick={this.loginHandler}
            color="#07adbc"
            disabled={
              !this.state.inputControls.email.isValid ||
              !this.state.inputControls.password.isValid ||
              (!this.state.inputControls.confirmPassword.isValid &&
                !this.state.logInMode)
            }
          >
            Submit
          </ReusableButton>
        </KeyboardAvoidingView>
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

const mapDispatchToProps = dispatch => {
  return {
    userAuth: authData => dispatch(userAuth(authData))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AuthScreen);
