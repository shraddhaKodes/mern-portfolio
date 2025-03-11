import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import "./Profile.css"; // Import the CSS file

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="profile-container">
      <div className="profile-grid">
        <div className="header">
          <h1 className="header-title">Profile</h1>
        </div>

        <div className="profile-content">
          <div className="profile-top">
            <div className="input-container">
              <Label>Profile Image</Label>
              <img
                src={user?.avatar?.url}
                alt="avatar"
                className="profile-image"
              />
            </div>
            <div className="input-container">
              <Label>Resume</Label>
              <Link to={user?.resume?.url} target="_blank">
                <img
                  src={user?.resume?.url}
                  alt="resume"
                  className="resume-image"
                />
              </Link>
            </div>
          </div>

          {[
            { label: "Full Name", value: user?.fullName, type: "text" },
            { label: "Email", value: user?.email, type: "email" },
            { label: "Phone", value: user?.phone, type: "text" },
            { label: "About Me", value: user?.aboutMe, type: "textarea" },
            { label: "Portfolio URL", value: user?.portfolioURL, type: "text" },
            { label: "Github URL", value: user?.githubURL, type: "text" },
            { label: "LinkedIn URL", value: user?.linkedInURL, type: "text" },
          ].map((field, index) => (
            <div className="input-container" key={index}>
              <Label>{field.label}</Label>
              {field.type === "textarea" ? (
                <Textarea defaultValue={field.value} disabled />
              ) : (
                <Input type={field.type} defaultValue={field.value} disabled />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
