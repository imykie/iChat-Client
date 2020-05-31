import { combineReducers } from "redux";
import messageReducer from "./messages/reducers";
import conversationReducer from "./conversation/reducers";

const rootReducer = combineReducers({
  message: messageReducer,
  conversation: conversationReducer,
});

export default rootReducer;
