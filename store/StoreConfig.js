import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import locationReducer from "./reducers/locationsReducer";
import uiReducer from "./reducers/uiReducer";

const rootReducer = combineReducers({
  locations: locationReducer,
  ui: uiReducer
});

let composeEnhancer = compose;

if (__DEV__) {
  composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const storeConfig = () => {
  return createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
};

export default storeConfig;
