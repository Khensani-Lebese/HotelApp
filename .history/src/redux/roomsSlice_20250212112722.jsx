import { createSlice } from "@reduxjs/toolkit";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDoc,
  getDocs,
} from "firebase/firestore";

const roomsSlice = createSlice({
  name: "rooms",
  initialState: [],
  reducers: {
    setRooms: (state, action) => action.payload,
    addRoom: (state, action) => {
      state.push(action.payload);
    },
    updateRoomInState: (state, action) => {
      return state.map((room) =>
        room.type === action.payload.type
          ? { ...room, ...action.payload }
          : room
      );
    },

    removeRoomFromState: (state, action) => {
      return state.filter((room) => room.id !== action.payload);
    },
  },
});

// Update the room type, loop through rooms and update those with the same type
export const updateRoomImageByType =
  (roomType, imageUrl) => async (dispatch) => {
    try {
      // Fetch all rooms of the specified type
      const roomsRef = collection(db, "rooms");
      const q = query(roomsRef, where("type", "==", roomType)); // Get all rooms of the same type
      const querySnapshot = await getDocs(q);

      // Loop through each room and update the image
      querySnapshot.forEach(async (doc) => {
        const roomRef = doc(db, "rooms", doc.id);
        await updateDoc(roomRef, { imageUrl }); // Update imageUrl for all rooms of the same type
      });

      // Update Redux state with the new image URL
      dispatch(setRooms(rooms));
    } catch (error) {
      console.error("Error updating room images:", error);
    }
  };

export const { setRooms, addRoom, updateRoomInState, removeRoomFromState } =
  roomsSlice.actions;

//Fetch rooms once from Firestore when the app starts
export const fetchRooms = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, "rooms"));
    const rooms = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setRooms(rooms));
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
};

export const startListeningToRooms = () => (dispatch) => {
  const unsubscribe = onSnapshot(
    collection(db, "rooms"),
    (querySnapshot) => {
      const rooms = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setRooms(rooms));
    },
    (error) => {
      console.error("Error listening to rooms:", error);
      dispatch(removeRoomFromState(error.documentId));
    }
  );

  return unsubscribe;
};

export const createRoom = (room) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, "rooms"), room);
    dispatch(addRoom({ id: docRef.id, ...room }));
  } catch (error) {
    console.error("Error adding room:", error);
  }
};

export const updateRoom = (room) => async (dispatch) => {
  try {
    const roomRef = doc(db, "rooms", room.id);
    const roomSnapshot = await getDoc(roomRef);
    if (roomSnapshot.exists()) {
      await updateDoc(roomRef, room);
      dispatch(updateRoomInState(room));
    }
  } catch (error) {
    console.error("Error updating room:", error);
  }
};

export const removeRoom = (roomId) => async (dispatch) => {
  try {
    const roomRef = doc(db, "rooms", roomId);
    await deleteDoc(roomRef);
    dispatch(removeRoomFromState(roomId));
  } catch (error) {
    console.error("Error removing room:", error);
  }
};

export default roomsSlice.reducer;
