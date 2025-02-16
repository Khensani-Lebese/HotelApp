import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice"; // Adjust path as needed
import { getDocs, collection, setDoc, doc } from "firebase/firestore"; // Firebase functions
import { db } from "../firebaseConfig";

const RoomList = ({ rooms = [] }) => {
  const roomsFromStore = useSelector((state) => state.rooms);
  const favoritesFromStore = useSelector((state) => state.favorites); // Get favorites from the store
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [favorites, setFavorites] = useState(favoritesFromStore); // Set initial favorites from Redux store

  useEffect(() => {
    setFavorites(favoritesFromStore); // Update favorites when the store changes
  }, [favoritesFromStore]);

  const handleFavoriteToggle = (roomId) => {
    if (favorites.includes(roomId)) {
      setFavorites(favorites.filter((id) => id !== roomId));
      dispatch(removeFavorite(roomId)); // Dispatch action to remove from favorites
    } else {
      setFavorites([...favorites, roomId]);
      dispatch(addFavorite(roomId)); // Dispatch action to add to favorites
    }
  };

  useEffect(() => {
    const updateRoomAvailability = async () => {
      const today = new Date();
      const bookingsQuerySnapshot = await getDocs(collection(db, "bookings"));

      bookingsQuerySnapshot.forEach(async (bookingDoc) => {
        const booking = bookingDoc.data();

        // Check if booking data is valid and has a checkOutDate
        if (booking && booking.checkOutDate && booking.roomId) {
          const checkOutDate = new Date(booking.checkOutDate);

          // Check if the checkout date is valid
          if (!isNaN(checkOutDate)) {
            if (checkOutDate < today) {
              await setDoc(
                doc(db, "rooms", booking.roomId),
                { status: "available" },
                { merge: true }
              );
            }
          } else {
            console.error("Invalid checkOutDate:", booking.checkOutDate);
          }
        } else {
          console.warn("Missing booking or checkOutDate:", booking);
        }
      });
    };

    updateRoomAvailability();
  }, []);

  const groupedRooms = roomsFromStore.reduce((acc, room) => {
    if (room.status === "available") {
      if (!acc[room.type]) {
        acc[room.type] = [];
      }
      acc[room.type].push(room);
    }
    return acc;
  }, {});

  const handleBookNow = (category) => {
    if (groupedRooms[category] && groupedRooms[category].length > 0) {
      const room = groupedRooms[category][0]; // Get the first room in the category
      navigate(`/bookings/${room.id}`, {
        state: { roomType: room.type, roomPrice: room.price },
      });
    }
  };

  return (
    <StyledRoomList>
      <h3 className="header">Room Categories</h3>
      <div className="room-container">
        {Object.keys(groupedRooms).map((category) => {
          const availableRoomsCount = groupedRooms[category]?.length || 0;

          return (
            <div key={category} className="room-card">
              {/* Favorites Button */}
              <button
                className="favorite-button"
                onClick={() =>
                  handleFavoriteToggle(groupedRooms[category]?.[0]?.id)
                }
              >
                {favorites.includes(groupedRooms[category]?.[0]?.id) ? (
                  <FaHeart />
                ) : (
                  <FaRegHeart />
                )}
              </button>

              <h4 className="room-type">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h4>
              <p className="room-info">
                Price: R{groupedRooms[category][0].price}{" "}
              </p>
              <p className="room-info">
                Capacity: {groupedRooms[category][0].capacity}
              </p>
              <p className="room-info">
                Utilities: {groupedRooms[category][0].utilities}
              </p>

              {groupedRooms[category][0].images &&
                groupedRooms[category][0]?.images?.length > 0 && (
                  <div className="room-images">
                    {groupedRooms[category][0].images.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`Room Image ${index}`}
                        className="room-image"
                      />
                    ))}
                  </div>
                )}

              <p className="room-info">
                Available rooms: {availableRoomsCount}
              </p>

              {/* Book Now button */}
              <button
                className="book-button"
                onClick={() => handleBookNow(category)}
                disabled={availableRoomsCount === 0} // Disable button if no rooms are available
              >
                {availableRoomsCount === 0 ? "Fully Booked" : "Book Now"}
              </button>
            </div>
          );
        })}
      </div>
    </StyledRoomList>
  );
};

const StyledRoomList = styled.div`
  .header {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #444;
  }

  .room-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }

  .room-card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    position: relative; /* Set position to relative for positioning the favorite button */
  }

  .room-type {
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }

  .room-info {
    font-size: 14px;
    color: #666;
  }

  .room-images {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .room-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
    border: 1px solid #ddd;
  }

  .book-button {
    background: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #0056b3;
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }

  /* Position the favorite button at the top-right */
  .favorite-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: #ff4040;

    &:hover {
      color: #ff0000;
    }
  }
`;

export default RoomList;
