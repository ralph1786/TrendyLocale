const initialState = {
  locations: [],
  redirect: false
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
    case "REDIRECT_SCREEN":
      return {
        ...state,
        redirect: true
      };
    case "RESET_REDIRECT":
      return {
        ...state,
        redirect: false
      };
    default:
      return state;
  }
};

export default locationReducer;
