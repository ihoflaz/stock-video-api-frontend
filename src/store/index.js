import { configureStore } from '@reduxjs/toolkit';
import pixabayReducer from './pixabaySlice';
import pexelsReducer from './pexelsSlice';

export const store = configureStore({
  reducer: {
    pixabay: pixabayReducer,
    pexels: pexelsReducer,
  },
});