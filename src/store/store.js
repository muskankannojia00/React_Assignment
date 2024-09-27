// store.js
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; // Correct named import for redux-thunk
import rootReducer from "../reducers/rootReducer"; // Import your root reducer

// Check if Redux DevTools extension is available
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)) // Apply middleware with optional DevTools
);

export default store;
