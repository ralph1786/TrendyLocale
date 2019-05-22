import axios from "axios";
import { apiKey } from "../../constant";

export const userAuth = authData => {
  return dispatch => {
    dispatch(userSignUp(authData));
  };
};

export const userSignUp = authData => {
  return dispatch => {
    axios
      .post(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`,
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      )
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };
};
