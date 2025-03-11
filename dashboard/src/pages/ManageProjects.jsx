import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  clearAllProjectErrors,
  deleteProject,
  getAllProjects,
  resetProjectSlice,
} from "../store/slices/projectSlice";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Eye, Pen, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import  "../styles/ManageProject.css";

const ManageProjects = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const { projects, error, message } = useSelector((state) => state.project);

  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const handleProjectDelete = (id) => {
    dispatch(deleteProject(id));
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
    <div className="manage-projects-container">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card className="card-container">
            <CardHeader className="card-header">
              <CardTitle className="card-title">Manage Your Projects</CardTitle>
              <Button className="return-button" onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </CardHeader>
            <CardContent>
              <Table className="table-container">
                <TableHeader className="table-header">
                  <TableRow>
                    <TableHead>Banner</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Stack</TableHead>
                    <TableHead className="hidden md:table-cell">Deployed</TableHead>
                    <TableHead className="md:table-cell">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects && projects.length > 0 ? (
                    projects.map((element) => (
                      <TableRow className="table-row" key={element._id}>
                        <TableCell>
                          <img
                            src={element.projectBanner?.url}
                            alt={element.title}
                            className="project-image"
                          />
                        </TableCell>
                        <TableCell>{element.title}</TableCell>
                        <TableCell className="hidden md:table-cell">{element.stack}</TableCell>
                        <TableCell className="hidden md:table-cell">{element.deployed}</TableCell>
                        <TableCell className="table-actions">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link to={`/view/project/${element._id}`}>
                                  <button className="action-button view-button">
                                    <Eye className="h-5 w-5" />
                                  </button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">View</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link to={`/update/project/${element._id}`}>
                                  <button className="action-button edit-button">
                                    <Pen className="h-5 w-5" />
                                  </button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">Edit</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  className="action-button delete-button"
                                  onClick={() => handleProjectDelete(element._id)}
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">Delete</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell className="text-2xl text-center" colSpan="5">
                        You have not added any projects.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageProjects;
