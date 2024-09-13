import { createSlice } from '@reduxjs/toolkit';
import { db } from '../firebaseConfig.jsx';
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState: [],
  reducers: {
    setReservations: (state, action) => {
      return action.payload;
    },
    addReservation: (state, action) => {
      state.push(action.payload);
    },
    updateReservation: (state, action) => {
      const index = state.findIndex(reservation => reservation.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeReservation: (state, action) => {
      return state.filter(reservation => reservation.id !== action.payload);
    },
    approveReservation: (state, action) => {
      const index = state.findIndex(reservation => reservation.id === action.payload);
      if (index !== -1) {
        state[index].status = 'approved';
      }
    },
    modifyReservation: (state, action) => {
      const index = state.findIndex(reservation => reservation.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
    cancelReservation: (state, action) => {
      const index = state.findIndex(reservation => reservation.id === action.payload);
      if (index !== -1) {
        state[index].status = 'canceled';
      }
    }
  }
});

export const { 
  setReservations, 
  addReservation, 
  updateReservation, 
  removeReservation, 
  approveReservation, 
  modifyReservation, 
  cancelReservation 
} = reservationsSlice.actions;

// Async thunk to fetch reservations from Firestore
export const fetchReservations = () => async dispatch => {
  try {
    const querySnapshot = await getDocs(collection(db, 'reservations'));
    const reservations = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch(setReservations(reservations));
  } catch (error) {
    console.error('Error fetching reservations:', error);
  }
};


// Async thunk to add a new reservation to Firestore
export const createReservation = (reservationData) => async dispatch => {
  try {
    const docRef = await addDoc(collection(db, 'reservations'), reservationData);
    const newReservation = { id: docRef.id, ...reservationData };
    dispatch(addReservation(newReservation));  // Update local state
  } catch (error) {
    console.error('Error creating reservation:', error);
  }
};

export const approveReservationInDb = (reservationId) => async dispatch => {
  try {
    const reservationDoc = doc(db, 'reservations', reservationId);
    await updateDoc(reservationDoc, { status: 'approved' });
    dispatch(approveReservation(reservationId));
  } catch (error) {
    console.error('Error approving reservation:', error);
  }
};

export const cancelReservationInDb = (reservationId) => async dispatch => {
  try {
    const reservationDoc = doc(db, 'reservations', reservationId);
    await updateDoc(reservationDoc, { status: 'canceled' });
    dispatch(cancelReservation(reservationId));
  } catch (error) {
    console.error('Error canceling reservation:', error);
  }
};


export default reservationsSlice.reducer;
