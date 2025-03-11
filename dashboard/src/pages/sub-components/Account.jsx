import { Link } from "react-router-dom";
import { useState } from "react";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";
import "./Account.css"; // Import the separate CSS file

const Account = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile");

  return (
    <div className="account-container">
      <main className="account-main">
        <div className="account-header">
          <h1>Settings</h1>
        </div>
        <div className="account-content">
          <nav className="account-nav">
            <Link
              to="#"
              className={selectedComponent === "Profile" ? "active-link" : ""}
              onClick={() => setSelectedComponent("Profile")}
            >
              Profile
            </Link>
            <Link
              to="#"
              className={selectedComponent === "Update Profile" ? "active-link" : ""}
              onClick={() => setSelectedComponent("Update Profile")}
            >
              Update Profile
            </Link>
            <Link
              to="#"
              className={selectedComponent === "Update Password" ? "active-link" : ""}
              onClick={() => setSelectedComponent("Update Password")}
            >
              Update Password
            </Link>
          </nav>
          <div className="account-section">
            {selectedComponent === "Profile" && <Profile />}
            {selectedComponent === "Update Profile" && <UpdateProfile />}
            {selectedComponent === "Update Password" && <UpdatePassword />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account;
