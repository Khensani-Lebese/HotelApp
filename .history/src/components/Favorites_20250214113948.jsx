import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const rooms = useSelector((state) => state.rooms);

  const favoriteRooms = rooms.filter((room) => favorites.includes(room.id));

  return (
    <StyledFavorites>
      <h2>Your Favorite Rooms</h2>
      {favoriteRooms.length > 0 ? (
        <div className="room-container">
          {favoriteRooms.map((room) => (
            <div key={room.id} className="room-card">
              <h4>{room.type}</h4>
              <p>Price: R{room.price}</p>
              <p>Capacity: {room.capacity}</p>
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
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite rooms added yet!</p>
      )}
    </StyledFavorites>
  );
};

const StyledFavorites = styled.div`
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
    padding: 20px;
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .room-images {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .room-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
  }
`;

export default Favorites;
