import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { projects } = useSelector((state) => state.project);
  const { skills } = useSelector((state) => state.skill);

  // Inline Component: DashboardCard
  const DashboardCard = ({ title, value, onClick }) => (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
        <h1>{value}</h1>
      </div>
      <div className="card-footer">
        <button className="btn" onClick={onClick}>Manage {title}</button>
      </div>
    </div>
  );

  // Inline Component: ProjectTable
  const ProjectTable = ({ projects }) => (
    <div className="card">
      <div className="card-header">
        <h3>Projects</h3>
      </div>
      <div className="card-content">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Stack</th>
              <th>Deployed</th>
              <th>Update</th>
              <th>Visit</th>
            </tr>
          </thead>
          <tbody>
            {projects && projects.length > 0 ? (
              projects.map((element) => (
                <tr key={element._id}>
                  <td>{element.title}</td>
                  <td>{element.stack}</td>
                  <td>{element.deployed}</td>
                  <td><a href={`/update/project/${element._id}`}>Update</a></td>
                  <td><a href={`/view/project/${element._id}`} target="_blank" rel="noopener noreferrer">Visit</a></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">You have not added any projects.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="card-container">
            <div className="card large-card">
              <div className="card-header">
                <p className="card-description">{user.aboutMe}</p>
              </div>
              <div className="card-footer">
                <button className="btn"  onClick={() => window.location.href = "http://localhost:5173"}>Visit Portfolio</button>
              </div>
            </div>

            <DashboardCard title="Projects Completed" value={projects?.length} onClick={() => navigate("/manage/projects")} />
            <DashboardCard title="Skills" value={skills?.length} onClick={() => navigate("/manage/skills")} />
          </div>

          <div className="tabs">
            <ProjectTable projects={projects} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
