import { db } from "./src/firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const generateRooms = async () => {
  const categories = ["standard", "deluxe", "superior"];

  // Predefined images for each room type
  const imagesByCategory = {
    standard: [
      "https://example.com/standard1.jpg",
      "https://example.com/standard2.jpg",
      "https://example.com/standard3.jpg",
    ],
    deluxe: [
      "https://example.com/deluxe1.jpg",
      "https://example.com/deluxe2.jpg",
      "https://example.com/deluxe3.jpg",
    ],
    superior: [
      "https://example.com/superior1.jpg",
      "https://example.com/superior2.jpg",
      "https://example.com/superior3.jpg",
    ],
  };

  // Predefined utilities for each room type
  const utilitiesByCategory = {
    standard: "Wi-Fi, TV, Air Conditioning",
    deluxe: "Wi-Fi, TV, Air Conditioning, Mini Bar, Room Service",
    superior:
      "Wi-Fi, TV, Air Conditioning, Mini Bar, Room Service, Jacuzzi, Balcony",
  };

  try {
    for (const category of categories) {
      for (let i = 1; i <= 100; i++) {
        const room = {
          id: uuidv4(),
          type: category,
          price:
            category === "standard" ? 50 : category === "deluxe" ? 100 : 150,
          capacity: category === "standard" ? 2 : category === "deluxe" ? 4 : 6,
          utilities: utilitiesByCategory[category], // Assign respective utilities for each room type
          images: imagesByCategory[category], // Assign respective images for each room type
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
