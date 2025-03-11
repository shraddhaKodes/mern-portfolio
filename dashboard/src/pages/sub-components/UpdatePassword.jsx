import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllUserErrors,
  resetProfile,
  updatePassword,
} from "@/store/slices/userSlice";
import SpecialLoadingButton from "./SpecialLoadingButton";
import "./Profile.css"; // Importing the external CSS file

const Profile = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const { loading, error, message, isUpdated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleUpdatePassword = () => {
    dispatch(updatePassword({ currentPassword, newPassword, confirmNewPassword }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message, isUpdated]);

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h1 className="profile-title">Update Password</h1>
        <br/>
        <br/>
        <div className="profile-form">
          <div className="form-group">
            <Label>Current Password</Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="profile-input"
            />
          </div>

          <div className="form-group">
            <Label>New Password</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="profile-input"
            />
          </div>

          <div className="form-group">
            <Label>Confirm New Password</Label>
            <Input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="profile-input"
            />
          </div>

          <div className="button-container">
            {!loading ? (
              <Button onClick={handleUpdatePassword} className="update-btn">
                Update Password
              </Button>
            ) : (
              <SpecialLoadingButton content={"Updating Password"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
