import { db } from "./src/firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const generateRooms = async () => {
  const categories = ["standard", "deluxe", "superior"];

  // Predefined images for each room type
  const imagesByCategory = {
    standard: [
      "https://images.pexels.com/photos/30651229/pexels-photo-30651229/free-photo-of-cozy-hotel-room-interior-with-vintage-tv.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    deluxe: [
      "https://images.pexels.com/photos/6466289/pexels-photo-6466289.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/17836120/pexels-photo-17836120/free-photo-of-luxury-room-of-gran-hotel-in-istanbul.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/3772615/pexels-photo-3772615.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    superior: [
      "https://images.pexels.com/photos/2598638/pexels-photo-2598638.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/3201921/pexels-photo-3201921.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/3315291/pexels-photo-3315291.jpeg?auto=compress&cs=tinysrgb&w=400",
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
