import {
  addNewSkill,
  clearAllSkillErrors,
  getAllSkills,
  resetSkillSlice,
} from "@/store/slices/skillSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import "./AddSkill.css"; // Importing the CSS file

const AddSkill = () => {
  const [title, setTitle] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [svg, setSvg] = useState("");
  const [svgPreview, setSvgPreview] = useState("");

  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSvgPreview(reader.result);
      setSvg(file);
    };
  };

  const { loading, message, error } = useSelector((state) => state.skill);
  const dispatch = useDispatch();

  const handleAddNewSkill = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("proficiency", proficiency);
    formData.append("svg", svg);
    dispatch(addNewSkill(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  }, [dispatch, error, message]);

  return (
    <div className="container">
      <form className="form" onSubmit={handleAddNewSkill}>
        <h2 className="title">ADD A NEW SKILL</h2>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="React.JS"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Proficiency</label>
          <input
            type="number"
            placeholder="30"
            value={proficiency}
            onChange={(e) => setProficiency(e.target.value)}
          />
        </div>

        <div className="form-group file-upload">
          <label>Skill Svg</label>
          <div className="upload-box">
            {svgPreview ? (
              <img className="preview-img" src={svgPreview} alt="Preview" />
            ) : (
              <p className="upload-text">Upload a file</p>
            )}
            <input type="file" className="file-input" onChange={handleSvg} />
          </div>
        </div>

        <div className="btn-container">
          <Button type="submit" className="btn" disabled={loading}>
            {loading ? "Adding Skill..." : "Add Skill"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddSkill;
