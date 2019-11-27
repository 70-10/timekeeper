import { combineReducers } from "@reduxjs/toolkit";
import counterModule from "./modules/counter";

const rootReducer = combineReducers({
  counter: counterModule.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
