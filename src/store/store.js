import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import { withFirebase } from "../context/Firebase";

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({ withFirebase }), logger)
  )
);
console.log(store.getState());
export default store;
