import { createSlice } from '@reduxjs/toolkit';
import { db } from '../firebaseConfig';
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: [],
  reducers: {
    setRooms: (state, action) => action.payload,
    addRoom: (state, action) => {
      state.push(action.payload);
    },
    updateRoomInState: (state, action) => {
      const index = state.findIndex(room => room.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeRoomFromState: (state, action) => {
      return state.filter(room => room.id !== action.payload);
    }
  }
});

export const { setRooms, addRoom, updateRoomInState, removeRoomFromState } = roomsSlice.actions;

export const startListeningToRooms = () => dispatch => {
  const unsubscribe = onSnapshot(collection(db, 'rooms'), (querySnapshot) => {
    const rooms = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch(setRooms(rooms));
  }, (error) => {
    console.error('Error listening to rooms:', error);
  });

  return unsubscribe;
};

export const createRoom = (room) => async dispatch => {
  try {
    const docRef = await addDoc(collection(db, 'rooms'), room);
    dispatch(addRoom({ id: docRef.id, ...room }));
  } catch (error) {
    console.error('Error adding room:', error);
  }
};

export const updateRoom = (room) => async dispatch => {
  try {
    const roomRef = doc(db, 'rooms', room.id);
    await updateDoc(roomRef, room);
    dispatch(updateRoomInState(room));
  } catch (error) {
    console.error('Error updating room:', error);
  }
};

export const removeRoom = (roomId) => async dispatch => {
  try {
    const roomRef = doc(db, 'rooms', roomId);
    await deleteDoc(roomRef);
    dispatch(removeRoomFromState(roomId));
  } catch (error) {
    console.error('Error removing room:', error);
  }
};

export default roomsSlice.reducer;
