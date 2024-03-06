
import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "./slice";
import navigationReducer from './reducer';
import DataIdReducer from "./dataIdreducer";


export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    navigation: navigationReducer,
    dataId:DataIdReducer,

    
  },
});

export default store;
