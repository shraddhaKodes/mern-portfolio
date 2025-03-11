import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import store from "./store/store";
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage.jsx";
import ResetPassword from "./pages/ResetPassword"; // Ensure you have a separate ResetPassword.jsx
import ManageProjects from "./pages/ManageProjects";
import ManageSkills from "./pages/ManageSkills";
import ManageTimeline from "./pages/ManageTimeline";
import UpdateProject from "./pages/UpdateProject";
import ViewProject from "./pages/ViewProject";

import { getUser } from "./store/slices/userSlice";
import { getAllProjects } from "./store/slices/projectSlice";
import { getAllSkills } from "./store/slices/skillSlice";
import { getAllTimeline } from "./store/slices/timelineSlice";
import { getAllSoftwareApplications } from "./store/slices/softwareApplicationSlice";
import { getAllMessages } from "./store/slices/messageSlice";

const App = () => {
  const dispatch = useDispatch(); // Add this line

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllProjects());
    dispatch(getAllSkills());
    dispatch(getAllTimeline());
    dispatch(getAllMessages());
    dispatch(getAllSoftwareApplications());
  }, [dispatch]);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/manage/projects" element={<ManageProjects />} />
          <Route path="/manage/skills" element={<ManageSkills />} />
          <Route path="/manage/timeline" element={<ManageTimeline />} />
          <Route path="/update/project/:id" element={<UpdateProject />} />
          <Route path="/view/project/:id" element={<ViewProject />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
