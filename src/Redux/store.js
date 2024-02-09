import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "./slice";

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
  },
});

export default store;
