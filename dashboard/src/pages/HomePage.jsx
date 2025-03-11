import { Link, useNavigate } from "react-router-dom";
import {
  FolderGit,
  History,
  Home,
  LayoutGrid,
  LogOut,
  MessageSquareMore,
  Package2,
  PencilRuler,
  User,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import Dashboard from "./sub-components/Dashboard";
import AddSkill from "./sub-components/AddSkill";
import AddProject from "./sub-components/AddProject";
import AddSoftwareApplications from "./sub-components/AddSoftwareApplications";
import Account from "./sub-components/Account";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import Messages from "./sub-components/Messages";
import AddTimeline from "./sub-components/AddTimeline";
import { toast } from "react-toastify";
import "../styles/HomePage.css"; // Import CSS file

const HomePage = () => {
  const [active, setActive] = useState("Dashboard");
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  // Get user authentication data from Redux
  const { user, isAuthenticated, error } = useSelector((state) => state.user);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch({ type: "SET_USER", payload: storedUser });
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Store user on login
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigateTo("/login");
  };

  return (
    <div className="home-container">
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <Link className="logo">
            <Package2 className="icon" />
          </Link>
          {[
            { name: "Dashboard", icon: <Home className="icon" /> },
            { name: "Add Project", icon: <FolderGit className="icon" /> },
            { name: "Add Skill", icon: <PencilRuler className="icon" /> },
            { name: "Add Uses", icon: <LayoutGrid className="icon" /> },
            { name: "Add Timeline", icon: <History className="icon" /> },
            { name: "Messages", icon: <MessageSquareMore className="icon" /> },
            { name: "Account", icon: <User className="icon" /> },
          ].map((item) => (
            <TooltipProvider key={item.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`sidebar-link ${
                      active === item.name ? "active" : ""
                    }`}
                    onClick={() => setActive(item.name)}
                  >
                    {item.icon}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>

        <nav className="sidebar-bottom">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  className="sidebar-link logout"
                  onClick={handleLogout}
                  href="http://localhost:5174/login"
                >
                  <LogOut className="icon" />
                </a>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <h1 className="text-4xl">
            Welcome back, {user?.fullName || "Guest"}
          </h1>
          <div className="profile">
            <img
              src={user?.avatar?.url || "/default-avatar.png"}
              alt="User Avatar"
            />
          </div>
        </header>

        <div className="dynamic_page">
          {/* Dynamic Page Content */}
          {(() => {
            switch (active) {
              case "Dashboard":
                return <Dashboard />;
              case "Add Project":
                return <AddProject />;
              case "Add Skill":
                return <AddSkill />;
              case "Add Uses":
                return <AddSoftwareApplications />;
              case "Add Timeline":
                return <AddTimeline />;
              case "Messages":
                return <Messages />;
              case "Account":
                return <Account />;
              default:
                return <Dashboard />;
            }
          })()}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
