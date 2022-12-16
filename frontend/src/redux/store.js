import { configureStore } from '@reduxjs/toolkit';
import homePageReducer from './homePageSlice.js';

const store = configureStore({
  reducer: {
    homePage: homePageReducer,
  },
});

export default store;
