import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updateProfile,
} from "@/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Link } from "react-router-dom";
import "./UpdateProfile.css"; // Import CSS file

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [aboutMe, setAboutMe] = useState(user?.aboutMe || "");
  const [portfolioURL, setPortfolioURL] = useState(user?.portfolioURL || "");
  const [linkedInURL, setLinkedInURL] = useState(user?.linkedInURL || "");
  const [githubURL, setGithubURL] = useState(user?.githubURL || "");
  const [instagramURL, setInstagramURL] = useState(user?.instagramURL || "");
  const [twitterURL, setTwitterURL] = useState(user?.twitterURL || "");
  const [facebookURL, setFacebookURL] = useState(user?.facebookURL || "");
  const [avatar, setAvatar] = useState(user?.avatar?.url || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || "");
  const [resume, setResume] = useState(user?.resume?.url || "");
  const [resumePreview, setResumePreview] = useState(user?.resume?.url || "");

  const dispatch = useDispatch();

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
    reader.readAsDataURL(file);
  };

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("aboutMe", aboutMe);
    formData.append("portfolioURL", portfolioURL);
    formData.append("linkedInURL", linkedInURL);
    formData.append("githubURL", githubURL);
    formData.append("instagramURL", instagramURL);
    formData.append("twitterURL", twitterURL);
    formData.append("facebookURL", facebookURL);
    formData.append("avatar", avatar);
    formData.append("resume", resume);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, isUpdated, message]);

  return (
    <div className="update-profile-container">
      <h1 className="profile-heading">Update Profile</h1>
      <p className="profile-subtext">Update Your Profile Here</p>
      <div className="profile-form">
        <div className="profile-images">
          <div className="image-upload">
            <Label>Profile Image</Label>
            <img src={avatarPreview || "/avatarHolder.jpg"} alt="Profile" />
            <input
              type="file"
              onChange={avatarHandler}
              className="file-input"
            />
          </div>
          <div className="image-upload">
            <Label>Resume</Label>
            <Link to={resumePreview} target="_blank">
              <img src={resumePreview || "/avatarHolder.jpg"} alt="Resume" />
            </Link>
            <input
              type="file"
              onChange={resumeHandler}
              className="file-input"
            />
          </div>
        </div>
        <div className="profile-inputs">
          <div className="form-group">
            <Label className="form-label">Full Name</Label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <Label className="form-label">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <Label className="form-label">Phone</Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <Label className="form-label">About Me</Label>
            <Textarea
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <Label className="form-label">Portfolio URL</Label>
            <Input
              value={portfolioURL}
              onChange={(e) => setPortfolioURL(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <Label className="form-label">LinkedIn URL</Label>
            <Input
              value={linkedInURL}
              onChange={(e) => setLinkedInURL(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <Label className="form-label">Github URL</Label>
            <Input
              value={githubURL}
              onChange={(e) => setGithubURL(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <Label className="form-label">Instagram URL</Label>
            <Input
              value={instagramURL}
              onChange={(e) => setInstagramURL(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <Label className="form-label">Twitter URL</Label>
            <Input
              value={twitterURL}
              onChange={(e) => setTwitterURL(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <Label className="form-label">Facebook URL</Label>
            <Input
              value={facebookURL}
              onChange={(e) => setFacebookURL(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="button-container">
            {!loading ? (
              <Button onClick={handleUpdateProfile} className="update-btn">
                Update Profile
              </Button>
            ) : (
              <SpecialLoadingButton content={"Updating..."} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
