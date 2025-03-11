import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  addNewTimeline,
  clearAllTimelineErrors,
  getAllTimeline,
  resetTimelineSlice,
} from "@/store/slices/timelineSlice";
import "./AddTimeline.css"; // Import the CSS file

const AddTimeline = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { loading, error, message } = useSelector((state) => state.timeline);
  const dispatch = useDispatch();

  const handleAddNewTimeline = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("from", from);
    formData.append("to", to);
    dispatch(addNewTimeline(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());
    }
  }, [dispatch, error, message, loading]);

  return (
    <div className="container">
      <form className="form-container" onSubmit={handleAddNewTimeline}>
        <h2 className="title">ADD A NEW TIMELINE</h2>

        <div className="input-wrapper">
          <label className="label">Title</label>
          <Input
            type="text"
            className="input-field"
            placeholder="Matriculation"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <label className="label">Description</label>
          <Textarea
            className="input-field"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <label className="label">From</label>
          <Input
            type="number"
            className="input-field"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <label className="label">To</label>
          <Input
            type="number"
            className="input-field"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <div className="button-container">
          {!loading ? (
            <Button type="submit" className="submit-btn">Add Timeline</Button>
          ) : (
            <SpecialLoadingButton content={"Adding New Skill"} />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTimeline;
