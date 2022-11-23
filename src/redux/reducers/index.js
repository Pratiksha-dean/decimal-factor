import { combineReducers } from "redux";
import userDetailsReducer from "./userDetailsReducer";
import leadDetailsReducer from "./leadDetailsReducer";
import reviewApplicationDetailsReducer from "./reviewApplicationDetailsReducer";

export const rootReducer = combineReducers({
  userDetailsReducer,
  leadDetailsReducer,
  reviewApplicationDetailsReducer,
});
