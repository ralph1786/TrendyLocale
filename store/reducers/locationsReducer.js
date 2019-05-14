import beautifulImage from "../../src/assets/bora-bora-3023437.jpg";

const initialState = {
  locations: [],
  selectedLocation: null
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_LOCATION":
      return {
        ...state,
        locations: state.locations.concat({
          key: Math.random(),
          name: action.payload,
          image: beautifulImage
        })
      };
    case "REMOVE_LOCATION":
      return {
        ...state,
        locations: state.locations.filter(
          location => location.key !== state.selectedLocation.key
        ),
        selectedLocation: null
      };

    case "SELECTED_LOCATION":
      return {
        ...state,
        selectedLocation: state.locations.find(
          location => location.key === action.payload
        )
      };
    case "DESELECT_LOCATION":
      return {
        ...state,
        selectedLocation: null
      };
    default:
      return state;
  }
};

export default locationReducer;
