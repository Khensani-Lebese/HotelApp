import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const RoomList = ({ rooms = [] }) => {
  const roomsFromStore = useSelector((state) => state.rooms);
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState(userFavorites);

  useEffect(() => {
    setFavorites(userFavorites);
  }, [userFavorites]);

  const handleFavoriteToggle = (roomId) => {
    if (favorites.includes(roomId)) {
      // If it's already a favorite, remove it
      setFavorites(favorites.filter((id) => id !== roomId));
      dispatch(removeFavorite(roomId)); // Dispatch action to remove from favorites (if using Redux)
    } else {
      // Add to favorites
      setFavorites([...favorites, roomId]);
      dispatch(addFavorite(roomId)); // Dispatch action to add to favorites (if using Redux)
    }
  };

  useEffect(() => {
    const updateRoomAvailability = async () => {
      const today = new Date();
      const bookingsQuerySnapshot = await getDocs(collection(db, "bookings"));

      bookingsQuerySnapshot.forEach(async (bookingDoc) => {
        const booking = bookingDoc.data();
        const checkOutDate = new Date(booking.checkOutDate);

        if (checkOutDate < today) {
          // Update room status to "available" after checkout
          await setDoc(
            doc(db, "rooms", booking.roomId),
            { status: "available" },
            { merge: true }
          );
        }
      });
    };

    updateRoomAvailability();
  }, []);

  // Group rooms by category (e.g., standard, deluxe, superior)
  const groupedRooms = roomsFromStore.reduce((acc, room) => {
    if (room.status === "available") {
      // Add to corresponding category group
      if (!acc[room.type]) {
        acc[room.type] = [];
      }
      acc[room.type].push(room);
    }
    return acc;
  }, {});

  // Function to handle booking for a category
  const handleBookNow = (category) => {
    const room = groupedRooms[category][0]; // Get the first room in the category
    navigate(`/bookings/${room.id}`, {
      state: { roomType: room.type, roomPrice: room.price },
    });
  };

  return (
    <StyledRoomList>
      <h3 className="header">Room Categories</h3>
      <div className="room-container">
        {Object.keys(groupedRooms).map((category) => {
          const availableRoomsCount = groupedRooms[category].length;

          return (
            <div key={category} className="room-card">
              
              <h4 className="room-type">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h4>
              <p className="room-info">
                Price: R{groupedRooms[category][0].price}{" "}
                {/* Price for the category */}
              </p>
              <p className="room-info">
                Capacity: {groupedRooms[category][0].capacity}
              </p>
              <p className="room-info">
                Utilities: {groupedRooms[category][0].utilities}
              </p>

              {/* Render category images (assuming all rooms in the category share the same images) */}
              {groupedRooms[category][0].images &&
                groupedRooms[category][0].images.length > 0 && (
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

              {/* Display number of available rooms */}
              <p className="room-info">
                Available rooms: {availableRoomsCount}
              </p>
              <p>

                {/* Favorites Button */}
                <button
                className="favorite-button"
                onClick={() => handleFavoriteToggle(groupedRooms[category][0].id)}
              >
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
`;

export default RoomList;
