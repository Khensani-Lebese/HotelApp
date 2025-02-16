// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "./roomsSlice";
import reservationsReducer from "./reservationsSlice";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import favoritesReducer from "./favoritesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomsReducer,
    user: userReducer,
    reservations: reservationsReducer,
    favorites: favoritesReducer,
  },
});

export default store;
