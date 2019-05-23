import axios from "axios";
import { apiKey } from "../../constant";
import { uiStartLoading, uiStopLoading } from "./ui";
import startTabs from "../../src/screens/MainTabs/startMainTabs";
import { AsyncStorage } from "react-native";
import App from "../../App";

export const userAuth = (authData, logInMode) => {
  return dispatch => {
    if (logInMode) {
      dispatch(userLogIn(authData));
    } else {
      dispatch(userSignUp(authData));
    }
  };
};

export const userSignUp = authData => {
  return dispatch => {
    dispatch(uiStartLoading());
    axios
      .post(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`,
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      )
      .then(res => {
        dispatch(uiStopLoading());
        startTabs();
      })
      .catch(err => {
        console.log(err);
        dispatch(uiStopLoading());
      });
  };
};

export const userLogIn = authData => {
  return dispatch => {
    dispatch(uiStartLoading());
    axios
      .post(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`,
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      )
      .then(res => {
        dispatch(uiStopLoading());
        dispatch(
          storeAuthToken(
            res.data.idToken,
            res.data.expiresIn,
            res.data.refreshToken
          )
        );
        startTabs();
      })
      .catch(err => {
        console.log(err);
        dispatch(uiStopLoading());
      });
  };
};

export const storeAuthToken = (token, expirationTime, refreshToken) => {
  return dispatch => {
    const currentTime = new Date().getTime();
    const timeWillExpire = currentTime + expirationTime * 1000;
    dispatch(authToken(token, timeWillExpire));
    AsyncStorage.setItem("Auth Token", token);
    AsyncStorage.setItem("Expiration Date", timeWillExpire.toString());
    AsyncStorage.setItem("refreshToken", refreshToken);
  };
};

export const authToken = (token, timeWillExpire) => {
  return {
    type: "AUTH_TOKEN",
    payload: token,
    expiration: timeWillExpire
  };
};

export const getAuthToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.authToken;
      const expirationDate = getState().auth.expirationDate;
      if (!token || new Date(expirationDate) <= new Date()) {
        let tokenFromStorage;
        AsyncStorage.getItem("Auth Token")
          .then(tokenFromStorage => {
            tokenFromStorage = tokenFromStorage;
            if (!tokenFromStorage) {
              reject();
              return;
            }
            return AsyncStorage.getItem("Expiration Date");
          })
          .then(expirationDate => {
            const parsedExpirationDate = new Date(parseInt(expirationDate));
            const currentTime = new Date();
            if (parsedExpirationDate > currentTime) {
              dispatch(authToken(tokenFromStorage));
              resolve(tokenFromStorage);
            } else {
              reject();
            }
          })
          .catch(err => reject());
      } else {
        resolve(token);
      }
    });
    return promise
      .catch(err => {
        return AsyncStorage.getItem("refreshToken")
          .then(refreshToken => {
            return fetch(
              `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
              {
                method: "POST",
                body: "grant_type=refresh_token&refresh_token=" + refreshToken,
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                }
              }
            );
          })
          .then(res => res.json())
          .then(res => {
            if (res.id_token) {
              dispatch(
                storeAuthToken(res.id_token, res.expires_in, res.refresh_token)
              );
              return res.id_token;
            } else {
              AsyncStorage.removeItem("Auth Token");
              AsyncStorage.removeItem("Expiration Date");
            }
          });
      })
      .then(token => {
        if (!token) {
          throw new Error();
        } else {
          return token;
        }
      });
  };
};

export const autoSignIn = () => {
  return dispatch => {
    dispatch(getAuthToken())
      .then(token => startTabs())
      .catch(err => console.log(err));
  };
};

export const userLogOut = () => {
  return dispatch => {
    AsyncStorage.removeItem("Auth Token");
    AsyncStorage.removeItem("Expiration Date");
    dispatch(removeToken());
    return AsyncStorage.removeItem("refreshToken").then(() => {
      App();
    });
  };
};

export const removeToken = () => {
  return {
    type: "REMOVE_TOKEN"
  };
};
