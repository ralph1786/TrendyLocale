import { uiStartLoading, uiStopLoading } from "./ui";
import axios from "axios";
import { getAuthToken } from "./auth";

const URL = "https://trendylocale-1558366343100.firebaseio.com/locations.json";

//First fetch stores the image using firebase cloud functions.
//Second fetch uses the response from the first fetch which is a string of the image.
//It then saves the image to the backend along with name and location.
export const addLocation = (name, location, image) => {
  return dispatch => {
    let authToken;
    dispatch(getAuthToken())
      .catch(() => alert("Invalid Token"))
      .then(token => {
        authToken = token;
        dispatch(uiStartLoading());
        return fetch(
          "https://us-central1-trendylocale-1558366343100.cloudfunctions.net/imageStorage",
          {
            method: "POST",
            body: JSON.stringify({
              image: image.base64
            }),
            headers: {
              Authorization: "Bearer " + authToken
            }
          }
        );
      })
      .then(res => res.json())
      .then(res => {
        const locationData = {
          name: name,
          location: location,
          image: res.imageUrl
        };
        return fetch(`${URL}?auth=${authToken}`, {
          method: "POST",
          body: JSON.stringify(locationData)
        });
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        dispatch(uiStopLoading());
        dispatch(redirectScreen());
      })
      .catch(err => {
        console.log(err);
        dispatch(uiStopLoading());
      });
  };
};

export const getAllLocations = locations => {
  return {
    type: "GET_ALL_LOCATIONS",
    payload: locations
  };
};

//getAuthToken returns a promise
export const fetchAllLocations = () => {
  return dispatch => {
    dispatch(getAuthToken())
      .then(token => axios.get(`${URL}?auth=${token}`))
      .catch(() => {
        alert("Invalid Token");
      })
      .then(res => {
        /*We receive an object with keys as a response the following code
        changes each key into an array of objects. The objects are filled
        with the data inside the key.
        */
        console.log(res);
        const locationArray = [];
        for (let key in res.data) {
          locationArray.push({
            ...res.data[key],
            key: key,
            image: {
              uri: res.data[key].image
            }
          });
        }
        dispatch(getAllLocations(locationArray));
      })
      .catch(err => console.log(err));
  };
};

//getAuthToken returns a promise
export const removeLocation = key => {
  return dispatch => {
    dispatch(getAuthToken())
      .catch(() => {
        alert("Invalid Token");
      })
      .then(token => {
        dispatch(deleteLocation(key));
        return axios.delete(
          "https://trendylocale-1558366343100.firebaseio.com/locations/" +
            key +
            ".json?auth=" +
            token
        );
      })
      .then(res => {
        console.log("Deleted");
      })
      .catch(err => console.log(err));
  };
};

export const deleteLocation = key => {
  return {
    type: "REMOVE_LOCATION",
    payload: key
  };
};

export const redirectScreen = () => {
  return {
    type: "REDIRECT_SCREEN"
  };
};

export const resetRedirect = () => {
  return {
    type: "RESET_REDIRECT"
  };
};
