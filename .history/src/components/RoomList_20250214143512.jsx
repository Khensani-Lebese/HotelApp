import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import logo from "../assets/logo.png";
import Logout from "./Logout";

const RoomList = ({ rooms = [] }) => {
  const roomsFromStore = useSelector((state) => state.rooms);
  const favoritesFromStore = useSelector((state) => state.favorites);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [favorites, setFavorites] = useState(favoritesFromStore);

  useEffect(() => {
    setFavorites(favoritesFromStore);
  }, [favoritesFromStore]);

  const handleFavoriteToggle = (roomId) => {
    if (!roomId) return; // Avoid errors if roomId is undefined

    if (favorites.includes(roomId)) {
      setFavorites(favorites.filter((id) => id !== roomId));
      dispatch(removeFavorite(roomId));
    } else {
      setFavorites([...favorites, roomId]);
      dispatch(addFavorite(roomId));
    }
  };

  useEffect(() => {
    const updateRoomAvailability = async () => {
      try {
        const today = new Date();
        const bookingsQuerySnapshot = await getDocs(collection(db, "bookings"));
        const roomsSnapshot = await getDocs(collection(db, "rooms"));

        let roomsMap = {};
        roomsSnapshot.docs.forEach((doc) => {
          roomsMap[doc.id] = { ...doc.data(), id: doc.id };
        });

        bookingsQuerySnapshot.forEach(async (bookingDoc) => {
          const booking = bookingDoc.data();

          if (booking?.checkOutDate && booking?.roomType) {
            const checkOutDate = new Date(booking.checkOutDate);

            if (!isNaN(checkOutDate) && checkOutDate < today) {
              const room = Object.values(roomsMap).find(
                (room) => room.type === booking.roomType
              );

              if (room) {
                await setDoc(
                  doc(db, "rooms", room.id),
                  { status: "available" },
                  { merge: true }
                );
              }
            }
          }
        });
      } catch (error) {
        console.error("Error updating room availability:", error);
      }
    };

    updateRoomAvailability();
  }, []);

  const groupedRooms = roomsFromStore.reduce((acc, room) => {
    if (room.status === "available") {
      if (!acc[room.type]) acc[room.type] = [];
      acc[room.type].push(room);
    }
    return acc;
  }, {});

  const handleBookNow = (category) => {
    const room = groupedRooms[category]?.[0];
    if (room) {
      navigate(`/bookings/${room.id}`, {
        state: { roomType: room.type, roomPrice: room.price },
      });
    }
  };

  return (
    <>
      <Navbar>
        <Logo>
          <LogoImage src={logo} alt="Hotel Logo" />
          TechWave Hotel
        </Logo>

        <NavLinks>
          <Link to="/profile">Profile</Link>
          <Link to="/bookings">My bookings</Link>
          <Link to="/favorites">Favorites</Link>
          <Logout />
        </NavLinks>
      </Navbar>
      <StyledRoomList>
        <h3 className="header">Room Categories</h3>
        <div className="room-container">
          {Object.keys(groupedRooms).map((category) => {
            const availableRoomsCount = groupedRooms[category]?.length || 0;
            const firstRoom = groupedRooms[category]?.[0];

            return (
              <div key={category} className="room-card">
                <button
                  className="favorite-button"
                  onClick={() => handleFavoriteToggle(firstRoom?.id)}
                >
                  {favorites.includes(firstRoom?.id) ? (
                    <FaHeart />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>

                <h4 className="room-type">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h4>
                <p className="room-info">Price: R{firstRoom?.price || "N/A"}</p>
                <p className="room-info">
                  Capacity: {firstRoom?.capacity || "N/A"}
                </p>
                <p className="room-info">
                  Utilities: {firstRoom?.utilities || "N/A"}
                </p>

                {firstRoom?.images?.length > 0 && (
                  <div className="room-images">
                    {firstRoom.images.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`Room ${category} Image ${index}`}
                        className="room-image"
                      />
                    ))}
                  </div>
                )}

                <p className="room-info">
                  Available rooms: {availableRoomsCount}
                </p>

                <button
                  className="book-button"
                  onClick={() => handleBookNow(category)}
                  disabled={availableRoomsCount === 0}
                >
                  {availableRoomsCount === 0 ? "Fully Booked" : "Book Now"}
                </button>
              </div>
            );
          })}
        </div>
        <Footer>
          <p>
            &copy; 2024 TechWaveHotelApp. All rights reserved.{" "}
            <NavLinks>
              <Link to="/policies">Policies</Link>
            </NavLinks>
          </p>
        </Footer>
      </StyledRoomList>
    </>
  );
};

const NavLinks = styled.div`
  a {
    color: #fff;
    text-decoration: none;
    margin-left: 1rem;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LogoImage = styled.img`
  height: 50px;
  margin-right: 1rem;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(
    0,
    0,
    0,
    0.5
  ); /* Add a slight overlay for better text contrast */
  color: #fff;
  margin-bottom: 2rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

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
    position: relative;
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
