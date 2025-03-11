import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  clearAllSkillErrors,
  updateSkill,
  resetSkillSlice,
  deleteSkill,
  getAllSkills,
} from "@/store/slices/skillSlice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import "../styles/ManageSkills.css";

const ManageSkills = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };
  const { skills, error, message } = useSelector((state) => state.skill);
  const dispatch = useDispatch();

  const [newProficiency, setNewProficiency] = useState(1);
  const handleInputChange = (proficiency) => {
    setNewProficiency(proficiency);
  };

  const handleUpdateSkill = (id) => {
    dispatch(updateSkill(id, newProficiency));
  };

  const handleDeleteSkill = (id) => {
    dispatch(deleteSkill(id));
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
    <div className="manage-skills-container">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card className="card-container">
            <CardHeader className="card-header">
              <CardTitle className="card-title">Manage Your Projects</CardTitle>
              <Button
                className="return-button"
                onClick={handleReturnToDashboard}
              >
                Return to Dashboard
              </Button>
            </CardHeader>
            <CardContent className="skill-container">
              {skills.map((skill) => {
                return (
                  <Card key={skill._id} className="skill-card">
                    <CardHeader className="skill-title">
                      <img
                        src={skill.svg.url}
                        alt={skill.title}
                        className="skill-image"
                      />
                      {skill.title}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Trash2
                              onClick={() => handleDeleteSkill(skill._id)}
                              className="delete-icon"
                            />
                          </TooltipTrigger>
                          <TooltipContent side="right" style={{ color: "red" }}>
                            Delete
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardHeader>
                    <CardFooter className="skill-footer">
                      <Label className="proficiency-label">Proficiency:</Label>
                      <Input
                        type="number"
                        className="proficiency-input"
                        defaultValue={skill.proficiency}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onBlur={() => handleUpdateSkill(skill._id)}
                      />
                    </CardFooter>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageSkills;
