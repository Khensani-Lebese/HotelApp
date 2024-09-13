import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RoomList = ({ rooms = [] }) => {
  const roomsFromStore = useSelector(state => state.rooms);
  const navigate = useNavigate();

  const handleBookNow = (roomId) => {
    navigate(`/bookings/${roomId}`); // Redirect to bookings page with roomId
  };

  return (
    <div>
      <h3>Room List</h3>
      {roomsFromStore.map(room => (
        <div key={room.id}>
          <h4>{room.type}</h4>
          <p>Price: {room.price}</p>
          <p>Capacity: {room.capacity}</p>
          <p>Utilities: {room.utilities}</p>
        
          {/* Render images */}
          {room.images && room.images.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {room.images.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Room Image ${index}`}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
                />
              ))}
            </div>
          )}
             <button onClick={() => handleBookNow(room.id)}>Book Now</button>
        </div>
      ))}
    </div>
  );
};

export default RoomList;
