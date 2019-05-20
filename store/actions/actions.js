export const addLocation = name => {
  return {
    type: "ADD_LOCATION",
    payload: name
  };
};

export const removeLocation = key => {
  return {
    type: "REMOVE_LOCATION",
    payload: key
  };
};

export const userAuth = authData => {
  return {
    type: "USER_AUTH",
    payload: authData
  };
};
