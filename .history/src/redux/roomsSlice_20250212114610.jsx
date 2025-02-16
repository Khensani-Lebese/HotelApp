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
        room.id === action.payload.id
          ? { ...room, ...action.payload } // Update room by id
          : room
      );
    },
    updateRoomImagesByTypeInState: (state, action) => {
      return state.map((room) =>
        room.type === action.payload.type
          ? { ...room, images: action.payload.images } // Update all rooms of the same type with new images
          : room
      );
    },
    removeRoomFromState: (state, action) => {
      return state.filter((room) => room.id !== action.payload);
    },
  },
});

// Update all rooms of the same type with new images
export const updateRoomImagesByType =
  (roomType, images) => async (dispatch) => {
    try {
      // Fetch all rooms of the specified type
      const roomsRef = collection(db, "rooms");
      const q = query(roomsRef, where("type", "==", roomType)); // Get all rooms of the same type
      const querySnapshot = await getDocs(q);

      // Loop through each room and update the images
      const roomsToUpdate = [];
      querySnapshot.forEach((doc) => {
        const roomRef = doc(db, "rooms", doc.id);
        roomsToUpdate.push(roomRef);
      });

      // Update the images for all rooms of the same type in Firestore
      for (const roomRef of roomsToUpdate) {
        await updateDoc(roomRef, { images });
      }

      // Update Redux state with the new images for rooms of this type
      dispatch(updateRoomImagesByTypeInState({ type: roomType, images }));
    } catch (error) {
      console.error("Error updating room images:", error);
    }
  };

// Fetch rooms once from Firestore when the app starts
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

// Start listening to real-time updates for rooms from Firestore
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
    }
  );

  return unsubscribe;
};

// Create a new room
export const createRoom = (room) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, "rooms"), room);
    dispatch(addRoom({ id: docRef.id, ...room }));
  } catch (error) {
    console.error("Error adding room:", error);
  }
};

// Update a room
export const updateRoom = (room) => async (dispatch) => {
  try {
    const roomRef = doc(db, "rooms", room.id);
    const roomSnapshot = await getDoc(roomRef);
    if (roomSnapshot.exists()) {
      await updateDoc(roomRef, room);
      dispatch(updateRoomInState(room)); // Update only the specific room by its id
    }
  } catch (error) {
    console.error("Error updating room:", error);
  }
};

// Remove a room
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
