
import { createSlice } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig'; 

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export const listenToAuthChanges = () => dispatch => {
  onAuthStateChanged(auth, user => {
    dispatch(setUser(user));
  });
};



export default authSlice.reducer;
