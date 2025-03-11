import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewSoftwareApplication,
  clearAllSoftwareAppErrors,
  getAllSoftwareApplications,
  resetSoftwareApplicationSlice,
} from "@/store/slices/softwareApplicationSlice";
import "./AddSoftwareApplication.css"; // Import CSS

const AddSoftwareApplications = () => {
  const [name, setName] = useState("");
  const [svg, setSvg] = useState("");
  const [svgPreview, setSvgPreview] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(
    (state) => state.softwareApplications
  );

  // Handle SVG Upload
  const handleSvg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "image/svg+xml") {
      toast.error("Only SVG files are allowed.");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSvgPreview(reader.result);
      setSvg(file);
    };
  };

  // Handle Form Submit
  const handleAddSoftwareApp = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("svg", svg);
    dispatch(addNewSoftwareApplication(formData));
  };

  // Handle Errors & Success Messages
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSoftwareAppErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSoftwareApplicationSlice());
      dispatch(getAllSoftwareApplications());
      setName("");
      setSvg("");
      setSvgPreview("");
    }
  }, [dispatch, error, message]);

  return (
    <div className="add-software-container">
      <form onSubmit={handleAddSoftwareApp} className="add-software-form">
        <h2 className="add-software-heading">Add Software Application</h2>

        {/* Application Name Input */}
        <div className="input-container">
          <label>Application Name</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter Application Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* File Upload */}
        <div className="file-upload-container">
          {svgPreview && <img src={svgPreview} alt="Preview" className="preview-img" />}
          <label htmlFor="file-upload" className="file-upload-label">
            Upload SVG
          </label>
          <input
            id="file-upload"
            type="file"
            className="sr-only"
            onChange={handleSvg}
            required
          />
          <p className="file-upload-text">Only SVG files allowed</p>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Adding..." : "Add Software"}
        </button>
      </form>
    </div>
  );
};

export default AddSoftwareApplications;
