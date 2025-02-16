import { db } from "./src/firebaseConfig.js";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const updateRoomStatus = async () => {
  try {
    const roomsCollection = collection(db, "rooms");
    const snapshot = await getDocs(roomsCollection);

    const batchUpdates = snapshot.docs.map(async (roomDoc) => {
      const roomRef = doc(db, "rooms", roomDoc.id);
      return updateDoc(roomRef, { status: "available" });
    });

    await Promise.all(batchUpdates);

    console.log("All rooms updated with status: available");
  } catch (error) {
    console.error("Error updating rooms:", error);
  }
};

updateRoomStatus();
