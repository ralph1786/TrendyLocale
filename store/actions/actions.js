export const addLocation = name => {
  return {
    type: "ADD_LOCATION",
    payload: name
  };
};

export const removeLocation = () => {
  return {
    type: "REMOVE_LOCATION"
  };
};

export const selectedLocation = key => {
  return {
    type: "SELECTED_LOCATION",
    payload: key
  };
};

export const deselectLocation = () => {
  return {
    type: "DESELECT_LOCATION"
  };
};
