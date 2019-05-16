import beautifulImage from "../../src/assets/bora-bora-3023437.jpg";

const initialState = {
  locations: []
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
          location => location.key !== action.payload
        )
      };
    default:
      return state;
  }
};

export default locationReducer;
