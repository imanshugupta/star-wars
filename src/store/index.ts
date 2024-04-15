// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import characters from "./reducers/characters";

// Import your reducers here

const store = configureStore({
  reducer: {
    // Add your reducers here
    characters,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
