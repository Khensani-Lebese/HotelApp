import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startListeningToRooms,
  createRoom,
  updateRoom,
  removeRoom,
} from "../redux/roomsSlice";
import RoomList from "../components/RoomList";
import { storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // import useNavigate

const DashboardWrapper = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Arial", sans-serif;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const AddRoomSection = styled.div`
  margin-bottom: 30px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const FileInput = styled.input`
  margin-bottom: 15px;
`;

const AddRoomButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #218838;
  }
`;

const PreviewImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 5px;
  border-radius: 5px;
`;

const RoomListWrapper = styled.div`
  margin-top: 30px;
`;

const RoomItem = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const RoomTitle = styled.h4`
  font-size: 18px;
  margin-bottom: 10px;
`;

const RoomInfo = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;

const EditDeleteButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

const ReservationsButton = styled.button`
  background-color: #ffc107;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  &:hover {
    background-color: #e0a800;
  }
`;

const AdminDashboard = () => {
  const [newRoom, setNewRoom] = useState({
    type: "",
    price: "",
    capacity: "",
    utilities: "",
    images: [],
  });

  const [editingRoom, setEditingRoom] = useState(null);

  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms);
  const navigate = useNavigate(); // initialize useNavigate

  useEffect(() => {
    const unsubscribe = dispatch(startListeningToRooms());
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [dispatch]);

  const handleAddRoom = async () => {
    try {
      const imageUrls = [];
      for (const image of newRoom.images) {
        const storageRef = ref(storage, `rooms/${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(snapshot.ref);
        imageUrls.push(imageUrl);
      }

      const roomData = {
        ...newRoom,
        images: imageUrls,
      };

      dispatch(createRoom(roomData));

      setNewRoom({
        type: "",
        price: "",
        capacity: "",
        utilities: "",
        images: [],
      });
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  const handleUpdateRoom = async () => {
    if (editingRoom) {
      try {
        let updatedRoom = { ...editingRoom };

        if (editingRoom.images && editingRoom.images.length > 0) {
          const imageUrls = [];
          for (const image of editingRoom.images) {
            const storageRef = ref(storage, `rooms/${image.name}`);
            const snapshot = await uploadBytes(storageRef, image);
            const imageUrl = await getDownloadURL(snapshot.ref);
            imageUrls.push(imageUrl);
          }

          updatedRoom = { ...updatedRoom, images: imageUrls };
        }

        dispatch(updateRoom({ id: editingRoom.id, ...updatedRoom }));
        setEditingRoom(null);
      } catch (error) {
        console.error("Error updating room:", error);
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

  const handleGoToReservations = () => {
    navigate("/admin/reservations"); // navigate to the reservations page
  };

  return (
    <DashboardWrapper>
      <SectionTitle>Admin Dashboard</SectionTitle>

      {/* Add Room Section */}
      <AddRoomSection>
        <h3>Add Room</h3>
        <Input
          type="text"
          value={newRoom.type}
          onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
          placeholder="Room Type"
        />
        <Input
          type="number"
          value={newRoom.price}
          onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
          placeholder="Price"
        />
        <Input
          type="number"
          value={newRoom.capacity}
          onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
          placeholder="Capacity"
        />
        <Input
          type="text"
          value={newRoom.utilities}
          onChange={(e) =>
            setNewRoom({ ...newRoom, utilities: e.target.value })
          }
          placeholder="Utilities"
        />
        <FileInput
          type="file"
          multiple
          onChange={(e) =>
            setNewRoom({ ...newRoom, images: Array.from(e.target.files) })
          }
        />
        <AddRoomButton onClick={handleAddRoom}>Add Room</AddRoomButton>

        {/* Display Preview of Uploaded Images */}
        {newRoom.images.length > 0 && (
          <PreviewImageWrapper>
            {Array.from(newRoom.images).map((image, index) => (
              <PreviewImage
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
              />
            ))}
          </PreviewImageWrapper>
        )}
      </AddRoomSection>

      {/* Manage Rooms Section */}
      <RoomListWrapper>
        <h3>Manage Rooms</h3>
        {rooms.map((room) => (
          <RoomItem key={room.id}>
            <RoomTitle>{room.type}</RoomTitle>
            <RoomInfo>Price: {room.price}</RoomInfo>
            <RoomInfo>Capacity: {room.capacity}</RoomInfo>
            <RoomInfo>Utilities: {room.utilities}</RoomInfo>

            {/* Render Room Images */}
            {room.images && room.images.length > 0 && (
              <PreviewImageWrapper>
                {room.images.map((imageUrl, index) => (
                  <PreviewImage
                    key={index}
                    src={imageUrl}
                    alt={`Room Image ${index}`}
                  />
                ))}
              </PreviewImageWrapper>
            )}

            {/* Edit and Delete Buttons */}
            <EditDeleteButton onClick={() => onEdit(room)}>
              Edit
            </EditDeleteButton>
            <EditDeleteButton onClick={() => onDelete(room.id)}>
              Delete
            </EditDeleteButton>
          </RoomItem>
        ))}
      </RoomListWrapper>

      {/* Edit Room Section */}
      {editingRoom && (
        <div>
          <h3>Edit Room</h3>
          <Input
            type="text"
            value={editingRoom.type}
            onChange={(e) =>
              setEditingRoom({ ...editingRoom, type: e.target.value })
            }
            placeholder="Room Type"
          />
          <Input
            type="number"
            value={editingRoom.price}
            onChange={(e) =>
              setEditingRoom({ ...editingRoom, price: e.target.value })
            }
            placeholder="Price"
          />
          <Input
            type="number"
            value={editingRoom.capacity}
            onChange={(e) =>
              setEditingRoom({ ...editingRoom, capacity: e.target.value })
            }
            placeholder="Capacity"
          />
          <Input
            type="text"
            value={editingRoom.utilities}
            onChange={(e) =>
              setEditingRoom({ ...editingRoom, utilities: e.target.value })
            }
            placeholder="Utilities"
          />
          <FileInput
            type="file"
            multiple
            onChange={(e) =>
              setEditingRoom({
                ...editingRoom,
                images: Array.from(e.target.files),
              })
            }
          />
          <AddRoomButton onClick={handleUpdateRoom}>Update Room</AddRoomButton>
        </div>
      )}

      {/* Go to Reservations Page Button */}
      <EditDeleteButton onClick={handleGoToReservations}>
        View Reservations
      </EditDeleteButton>
    </DashboardWrapper>
  );
};

export default AdminDashboard;
