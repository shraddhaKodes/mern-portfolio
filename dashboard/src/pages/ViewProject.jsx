import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ViewProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/project/get/${id}`, {
          withCredentials: true,
        });

        const project = res.data.project;
        setTitle(project.title);
        setDescription(project.description);
        setStack(project.stack);
        setDeployed(project.deployed);
        setTechnologies(project.technologies);
        setGitRepoLink(project.gitRepoLink);
        setProjectLink(project.projectLink);
        setProjectBanner(project.projectBanner?.url || "/avatarHolder.jpg");
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching project");
      }
    };
    getProject();
  }, [id]);

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh", 
      padding: "20px", 
      background: "linear-gradient(to right, #f8fafc, #e2e8f0)" 
    }}>
      <div style={{ 
        width: "100%", 
        maxWidth: "1000px", 
        background: "#fff", 
        padding: "30px", 
        borderRadius: "12px", 
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
        transition: "0.3s ease-in-out"
      }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <Button onClick={() => navigate("/")} style={{ background: "#1e40af", color: "#fff", padding: "10px 15px", borderRadius: "8px" }}>Return to Dashboard</Button>
        </div>

        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "2.2rem", fontWeight: "bold", marginBottom: "15px", color: "#1e293b" }}>{title}</h1>
          <img 
            src={projectBanner} 
            alt="Project Banner" 
            style={{ 
              width: "100%", 
              height: "auto", 
              borderRadius: "10px", 
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              transition: "0.3s ease-in-out"
            }} 
          />
        </div>

        <div style={{ marginTop: "25px" }}>
          <ProjectDetail title="Description" content={description} isList />
          <ProjectDetail title="Technologies" content={technologies} isList />
          <ProjectDetail title="Stack" content={stack} />
          <ProjectDetail title="Deployed" content={deployed} />
          <ProjectLink title="Github Repository" url={gitRepoLink} />
          <ProjectLink title="Project Link" url={projectLink} />
        </div>
      </div>
    </div>
  );
};

const ProjectDetail = ({ title, content, isList = false }) => (
  <div style={{ marginBottom: "20px" }}>
    <p style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: "5px", color: "#334155" }}>{title}:</p>
    {isList ? (
      <ul style={{ listStyle: "disc", paddingLeft: "20px", color: "#475569" }}>
        {content.split(/, |\. /).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    ) : (
      <p style={{ color: "#475569" }}>{content}</p>
    )}
  </div>
);

const ProjectLink = ({ title, url }) => (
  <div style={{ marginBottom: "20px" }}>
    <p style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: "5px", color: "#334155" }}>{title}:</p>
    <Link 
      to={url} 
      target="_blank" 
      style={{ 
        color: "#1e40af", 
        textDecoration: "none", 
        fontWeight: "bold", 
        transition: "0.3s ease-in-out" 
      }}
      onMouseOver={(e) => e.target.style.color = "#0f172a"}
      onMouseOut={(e) => e.target.style.color = "#1e40af"}
    >
      {url}
    </Link>
  </div>
);

export default ViewProject;