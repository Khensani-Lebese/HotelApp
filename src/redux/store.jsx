// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import roomsReducer from './roomsSlice';
import reservationsReducer from './reservationsSlice';
import userReducer from './userSlice'; 

const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    user: userReducer,
    reservations: reservationsReducer
  }
});

export default store;
