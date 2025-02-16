import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRooms,
  startListeningToRooms,
  createRoom,
  updateRoom,
  removeRoom,
} from "../redux/roomsSlice";
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

const RoomTypeButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
  font-size: 16px;
  &:hover {
    background-color: #0056b3;
  }
`;
const Input = styled.input`
  padding: 8px;
  margin: 10px 0;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
`;
const FileInput = styled.input`
  padding: 8px;
  margin: 10px 0;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
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
  const [selectedRoomType, setSelectedRoomType] = useState("all"); // state for selected room type

  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms);
  const navigate = useNavigate(); // initialize useNavigate

  useEffect(() => {
    dispatch(fetchRooms());
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

  // Filter rooms by type
  const filteredRooms =
    selectedRoomType === "all"
      ? rooms
      : rooms.filter((room) => room.type === selectedRoomType);

  return (
    <DashboardWrapper>
      <SectionTitle>Admin Dashboard</SectionTitle>

      {/* Room Type Filter Buttons */}
      <div>
        <RoomTypeButton onClick={() => setSelectedRoomType("all")}>
          All Rooms
        </RoomTypeButton>
        <RoomTypeButton onClick={() => setSelectedRoomType("standard")}>
          Standard
        </RoomTypeButton>
        <RoomTypeButton onClick={() => setSelectedRoomType("deluxe")}>
          Deluxe
        </RoomTypeButton>
        <RoomTypeButton onClick={() => setSelectedRoomType("superior")}>
          Superior
        </RoomTypeButton>
      </div>

      {/* List Rooms */}
      <RoomListWrapper>
        <h3>Available Rooms</h3>
        {filteredRooms.length === 0 ? (
          <p>No rooms available</p>
        ) : (
          filteredRooms.map((room) => (
            <RoomItem key={room.id}>
              <RoomTitle>{room.type}</RoomTitle>
              <RoomInfo>Price: {room.price}</RoomInfo>
              <RoomInfo>Capacity: {room.capacity}</RoomInfo>
              <RoomInfo>Utilities: {room.utilities}</RoomInfo>

              {/* Display Images */}
              {room.images && room.images.length > 0 && (
                <div>
                  {room.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Room ${index}`}
                      width="100"
                    />
                  ))}
                </div>
              )}

              {/* Edit Room Form */}
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
                      setEditingRoom({
                        ...editingRoom,
                        capacity: e.target.value,
                      })
                    }
                    placeholder="Capacity"
                  />
                  <Input
                    type="text"
                    value={editingRoom.utilities}
                    onChange={(e) =>
                      setEditingRoom({
                        ...editingRoom,
                        utilities: e.target.value,
                      })
                    }
                    placeholder="Utilities"
                  />

                  {/* Image upload */}
                  <FileInput
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      setEditingRoom({ ...editingRoom, images: e.target.files })
                    }
                  />

                  <AddRoomButton onClick={handleUpdateRoom}>
                    Update Room
                  </AddRoomButton>
                </div>
              )}

              {/* Edit and Delete Buttons */}
              <div>
                <EditDeleteButton onClick={() => onEdit(room)}>
                  Edit
                </EditDeleteButton>
                <EditDeleteButton onClick={() => onDelete(room.id)}>
                  Delete
                </EditDeleteButton>
              </div>
            </RoomItem>
          ))
        )}
      </RoomListWrapper>
    </DashboardWrapper>
  );
};

export default AdminDashboard;
