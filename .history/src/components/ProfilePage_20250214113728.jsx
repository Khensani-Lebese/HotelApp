import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebaseConfig"; // Make sure Firebase is correctly configured
import { updatePassword, sendPasswordResetEmail } from "firebase/auth"; // Firebase methods

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

      // Use Firebase updatePassword to change the password
      await updatePassword(user, newPassword);
      setSuccess("Password changed successfully!");
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePasswordReset = async () => {
    try {
      // Send a password reset email to the user
      await sendPasswordResetEmail(auth, user.email);
      setSuccess("Password reset email sent!");
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <form onSubmit={handlePasswordChange}>
            <label>
              Current Password:
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              New Password:
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </label>
            <br />
            <button type="submit">Change Password</button>
          </form>
          <button onClick={handlePasswordReset}>Reset Password</button>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default ProfilePage;
