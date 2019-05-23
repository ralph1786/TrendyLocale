const initialState = {
  authToken: null,
  expirationDate: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_TOKEN":
      return {
        ...state,
        authToken: action.payload,
        expirationDate: action.expiration
      };
    case "REMOVE_TOKEN":
      return {
        ...state,
        authToken: null,
        expirationDate: null
      };
    default:
      return state;
  }
};

export default authReducer;
