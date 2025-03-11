import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addNewProject,
  clearAllProjectErrors,
  getAllProjects,
  resetProjectSlice,
} from "@/store/slices/projectSlice";
import "./AddProject.css"; // Import CSS file

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState([]);
  const [deployed, setDeployed] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.project);

  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBannerPreview(reader.result);
      setProjectBanner(file);
    };
  };

  const handleCheckboxChange = (value) => {
    setStack((prevStack) =>
      prevStack.includes(value)
        ? prevStack.filter((item) => item !== value)
        : [...prevStack, value]
    );
  };

  const handleAddNewProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("technologies", technologies);
    formData.append("stack", stack.join(", "));
    formData.append("deployed", deployed ? "Yes" : "No");
    formData.append("projectBanner", projectBanner);
    dispatch(addNewProject(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [dispatch, error, message]);

  return (
    <div className="add-project-container">
      <form onSubmit={handleAddNewProject} className="add-project-form">
        <h2 className="form-title">🚀 Add a New Project</h2>

        <label>Project Title</label>
        <input
          type="text"
          placeholder="Enter project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description</label>
        <textarea
          placeholder="Describe your project features"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Technologies Used</label>
        <input
          type="text"
          placeholder="e.g., HTML, CSS, JavaScript, React"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
        />

        {/* Stack Selection */}
        <fieldset className="checkbox-group">
          <legend>Project Stack</legend>
          {["Full Stack", "MERN", "MEAN", "Next.js", "React.js"].map((option) => (
            <label key={option} className="checkbox-label">
              <input
                type="checkbox"
                value={option}
                checked={stack.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          ))}
        </fieldset>

        {/* Deployed Checkbox */}
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={deployed}
            onChange={() => setDeployed(!deployed)}
          />
          Is this project deployed?
        </label>

        <label>GitHub Repository Link</label>
        <input
          type="url"
          placeholder="Enter GitHub link"
          value={gitRepoLink}
          onChange={(e) => setGitRepoLink(e.target.value)}
        />

        <label>Project Live Link</label>
        <input
          type="url"
          placeholder="Enter deployment link"
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
        />

        {/* Project Banner Upload */}
        <label>Project Banner</label>
        <input type="file" onChange={handleSvg} accept="image/*" />
        {projectBannerPreview && (
          <img src={projectBannerPreview} alt="Preview" className="banner-preview" />
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Adding..." : "Add Project"}
        </button>
      </form>
    </div>
  );
};

export default AddProject;
