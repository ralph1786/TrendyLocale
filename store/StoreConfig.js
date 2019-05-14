import { createStore, combineReducers, compose } from "redux";

import locationReducer from "./reducers/locationsReducer";

const rootReducer = combineReducers({
  locations: locationReducer
});

let composeEnhancer = compose;

if (__DEV__) {
  composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const storeConfig = () => {
  return createStore(rootReducer, composeEnhancer());
};

export default storeConfig;
