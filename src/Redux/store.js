import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "./slice";
import navigationReducer from './reducer';


export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    navigation: navigationReducer,

    
  },
});

export default store;
