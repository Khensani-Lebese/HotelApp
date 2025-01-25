import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../firebaseConfig'; 

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (_, action) => action.payload,
    clearUser: () => null,
  }
});

export const { setUser, clearUser } = userSlice.actions;

export const listenToAuthChanges = () => dispatch => {
  auth.onAuthStateChanged(user => {
    if (user) {
      dispatch(setUser({ id: user.uid, email: user.email }));
    } else {
      dispatch(clearUser());
    }
  });
};

export default userSlice.reducer;
