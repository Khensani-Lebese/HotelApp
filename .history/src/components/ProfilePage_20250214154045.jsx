import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebaseConfig"; // Ensure Firebase is correctly set up
import { updatePassword, sendPasswordResetEmail } from "firebase/auth"; // Firebase methods
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const InfoText = styled.p`
  font-size: 1rem;
  color: #444;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  text-align: left;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 10px;
  background: ${(props) => (props.primary ? "#007bff" : "#6c757d")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: ${(props) => (props.primary ? "#0056b3" : "#5a6268")};
  }
`;

const Message = styled.p`
  margin-top: 15px;
  color: ${(props) => (props.error ? "red" : "green")};
  font-weight: bold;
`;

const ProfilePage = () => {
  const user = useSelector((state) => state.user); // Access user from Redux
  const dispatch = useDispatch();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    try {
      if (newPassword.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }

      await updatePassword(user, newPassword);
      setSuccess("Password changed successfully!");
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      setSuccess("Password reset email sent!");
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Title>Profile</Title>
      {user ? (
        <>
          <InfoText>
            <strong>Email:</strong> {user.email}
          </InfoText>
          <Form onSubmit={handlePasswordChange}>
            <Label>New Password:</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Button primary type="submit">
              Change Password
            </Button>
          </Form>
          <Button onClick={handlePasswordReset}>Reset Password</Button>
        </>
      ) : (
        <InfoText>Please log in to view your profile.</InfoText>
      )}

      {error && <Message error>{error}</Message>}
      {success && <Message>{success}</Message>}
    </Container>
  );
};

export default ProfilePage;
