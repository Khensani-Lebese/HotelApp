import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startListeningToRooms, createRoom, updateRoom, removeRoom } from '../redux/roomsSlice';
import RoomList from '../components/RoomList';
import { storage } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AdminDashboard = () => {
  const [newRoom, setNewRoom] = useState({
    type: '',
    price: '',
    capacity: '',
    utilities: '',
    images: [], // Array of image files
  });

  const [editingRoom, setEditingRoom] = useState(null);

  const dispatch = useDispatch();
  const rooms = useSelector(state => state.rooms);

  useEffect(() => {
    // Set up Firestore listener
    const unsubscribe = dispatch(startListeningToRooms());
    return () => {
      // Clean up listener on component unmount
      if (unsubscribe) unsubscribe();
    };
  }, [dispatch]);

  const handleAddRoom = async () => {
    try {
      const imageUrls = [];

      // Upload all images
      for (const image of newRoom.images) {
        const storageRef = ref(storage, `rooms/${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(snapshot.ref);
        imageUrls.push(imageUrl);
      }

      // Save the room with the image URLs
      const roomData = {
        ...newRoom,
        images: imageUrls,
      };

      // Dispatch the createRoom action
      dispatch(createRoom(roomData));

      // Clear the input fields
      setNewRoom({
        type: '',
        price: '',
        capacity: '',
        utilities: '',
        images: [],
      });
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  const handleUpdateRoom = async () => {
    if (editingRoom) {
      try {
        let updatedRoom = { ...editingRoom };

        if (editingRoom.images && editingRoom.images.length > 0) {
          const imageUrls = [];

          // Upload all images
          for (const image of editingRoom.images) {
            const storageRef = ref(storage, `rooms/${image.name}`);
            const snapshot = await uploadBytes(storageRef, image);
            const imageUrl = await getDownloadURL(snapshot.ref);
            imageUrls.push(imageUrl);
          }

          // Update the room data with the new image URLs
          updatedRoom = { ...updatedRoom, images: imageUrls };
        }

        // Dispatch the updateRoom action
        dispatch(updateRoom({ id: editingRoom.id, ...updatedRoom }));
        setEditingRoom(null); // Clear edit mode
      } catch (error) {
        console.error('Error updating room:', error);
      }
    }
  };

  const handleRemoveRoom = (roomId) => {
    dispatch(removeRoom(roomId));
  };

  const onEdit = (room) => {
    setEditingRoom(room);
  };

  const onDelete = (roomId) => {
    handleRemoveRoom(roomId);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* Add Room */}
      <div>
        <h3>Add Room</h3>
        <input
          type="text"
          value={newRoom.type}
          onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
          placeholder="Room Type"
        />
        <input
          type="number"
          value={newRoom.price}
          onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
          placeholder="Price"
        />
        <input
          type="number"
          value={newRoom.capacity}
          onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
          placeholder="Capacity"
        />
        <input
          type="text"
          value={newRoom.utilities}
          onChange={(e) => setNewRoom({ ...newRoom, utilities: e.target.value })}
          placeholder="Utilities"
        />
        <input
          type="file"
          multiple
          onChange={(e) => setNewRoom({ ...newRoom, images: Array.from(e.target.files) })}
        />
        <button onClick={handleAddRoom}>Add Room</button>
      </div>

      {/* Display Uploaded Images */}
      {newRoom.images.length > 0 && (
        <div>
          <h3>Preview Images</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {Array.from(newRoom.images).map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
                style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Room List */}
      <div>
        <h3>Manage Rooms</h3>
        <div>
          {rooms.map(room => (
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

              {/* Edit and Delete Buttons */}
              <button onClick={() => onEdit(room)}>Edit</button>
              <button onClick={() => onDelete(room.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Room */}
      {editingRoom && (
        <div>
          <h3>Edit Room</h3>
          <input
            type="text"
            value={editingRoom.type}
            onChange={(e) => setEditingRoom({ ...editingRoom, type: e.target.value })}
            placeholder="Room Type"
          />
          <input
            type="number"
            value={editingRoom.price}
            onChange={(e) => setEditingRoom({ ...editingRoom, price: e.target.value })}
            placeholder="Price"
          />
          <input
            type="number"
            value={editingRoom.capacity}
            onChange={(e) => setEditingRoom({ ...editingRoom, capacity: e.target.value })}
            placeholder="Capacity"
          />
          <input
            type="text"
            value={editingRoom.utilities}
            onChange={(e) => setEditingRoom({ ...editingRoom, utilities: e.target.value })}
            placeholder="Utilities"
          />
          <input
            type="file"
            multiple
            onChange={(e) => setEditingRoom({ ...editingRoom, images: Array.from(e.target.files) })}
          />
          <button onClick={handleUpdateRoom}>Update Room</button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
