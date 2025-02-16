import { db } from "./src/firebaseConfig.jsx";
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const generateRooms = async () => {
  const categories = ["standard", "deluxe", "superior"];
  try {
    for (const category of categories) {
      for (let i = 1; i <= 100; i++) {
        const room = {
          id: uuidv4(),
          type: category,
          price:
            category === "standard" ? 50 : category === "deluxe" ? 100 : 150,
          capacity: category === "standard" ? 2 : category === "deluxe" ? 4 : 6,
          utilities: "Wi-Fi, TV, Air Conditioning",
          images: [],
        };

        await addDoc(collection(db, "rooms"), room);
        console.log(`Added room ${i} for ${category}`);
      }
    }
    console.log("Rooms added successfully!");
  } catch (error) {
    console.error("Error adding rooms:", error);
  }
};

generateRooms();
