import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import SpecialLoadingButton from './sub-components/SpecialLoadingButton';
import { clearAllProjectErrors, getAllProjects, resetProjectSlice, updateProject } from '@/store/slices/projectSlice';
import '../styles/UpdateProject.css';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const UpdateProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [stack, setStack] = useState('');
  const [gitRepoLink, setGitRepoLink] = useState('');
  const [deployed, setDeployed] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [projectBanner, setProjectBanner] = useState('');
  const [projectBannerPreview, setProjectBannerPreview] = useState('');

  const { error, message } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleProjectBanner = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBannerPreview(reader.result);
      setProjectBanner(file);
    };
  };

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/project/get/${id}`, { withCredentials: true });
        const project = res.data.project;
        setTitle(project.title);
        setDescription(project.description);
        setStack(project.stack);
        setDeployed(project.deployed);
        setTechnologies(project.technologies);
        setGitRepoLink(project.gitRepoLink);
        setProjectLink(project.projectLink);
        setProjectBanner(project.projectBanner?.url || '');
        setProjectBannerPreview(project.projectBanner?.url || '');
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    getProject();

    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [id, message, error, dispatch]);

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('deployed', deployed);
    formData.append('stack', stack);
    formData.append('technologies', technologies);
    formData.append('gitRepoLink', gitRepoLink);
    formData.append('projectLink', projectLink);
    formData.append('projectBanner', projectBanner);

    dispatch(updateProject(id, formData));
  };

  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => navigateTo('/');

  return (
    <div className="update-project-container">
      <form onSubmit={handleUpdateProject} className="update-project-form">
        <div className="header-container">
          <h2 className="card-title">Update Project</h2>
          <button type="button" className="return-button" onClick={handleReturnToDashboard}>
            Return to Dashboard
          </button>
        </div>

        <div className="form-section">
          <img
            src={projectBannerPreview || '/avatarHolder.jpg'}
            alt="Project Banner"
            className="project-banner-preview"
          />
          <input type="file" onChange={handleProjectBanner} className="file-input" />
        </div>

        <div className="form-group">
          <label htmlFor="title">Project Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="technologies">Technologies</label>
          <textarea
            id="technologies"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stack">Stack</label>
          <select
            id="stack"
            value={stack}
            onChange={(e) => setStack(e.target.value)}
            required
          >
            <option value="" disabled>Select Project Stack</option>
            <option value="Full Stack">Full Stack</option>
            <option value="MERN">MERN</option>
            <option value="MEAN">MEAN</option>
            <option value="Next.js">Next.js</option>
            <option value="React.js">React.js</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="deployed">Deployed</label>
          <select
            id="deployed"
            value={deployed}
            onChange={(e) => setDeployed(e.target.value)}
            required
          >
            <option value="" disabled>Is this project deployed?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="gitRepoLink">GitHub Repository Link</label>
          <input
            type="url"
            id="gitRepoLink"
            value={gitRepoLink}
            onChange={(e) => setGitRepoLink(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="projectLink">Project Link</label>
          <input
            type="url"
            id="projectLink"
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="update-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateProject;
