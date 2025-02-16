import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RoomList = ({ rooms = [] }) => {
  const roomsFromStore = useSelector((state) => state.rooms);
  const navigate = useNavigate();

  const handleBookNow = (roomId) => {
    navigate(`/bookings/${roomId}`); // Redirect to bookings page with roomId
  };

  return (
    <StyledRoomList>
      <h3 className="header">Room List</h3>
      <div className="room-container">
        {roomsFromStore.map((room) => (
          <div key={room.id} className="room-card">
            <h4 className="room-type">{room.type}</h4>
            <p className="room-info">Price:R{room.price}</p>
            <p className="room-info">Capacity: {room.capacity}</p>
            <p className="room-info">Utilities: {room.utilities}</p>

            {/* Render images */}
            {room.images && room.images.length > 0 && (
              <div className="room-images">
                {room.images.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Room Image ${index}`}
                    className="room-image"
                  />
                ))}
              </div>
            )}

            <button
              className="book-button"
              onClick={() => handleBookNow(room.id)}
            >
              Book Now
            </button>
          </div>
        ))}
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
  }
`;

export default RoomList;
