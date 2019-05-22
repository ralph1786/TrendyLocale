const initialState = {
  locations: []
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_LOCATIONS":
      return {
        ...state,
        locations: action.payload
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
