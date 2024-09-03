// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/reducers.js';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
