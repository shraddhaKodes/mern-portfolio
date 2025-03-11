import { useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import {
  clearAllTimelineErrors,
  deleteTimeline,
  getAllTimeline,
  resetTimelineSlice,
} from "@/store/slices/timelineSlice";
import moment from "moment";
import "../styles/ManageTimeline.css"; // Importing the external CSS file

const ManageTimeline = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const { loading, timeline, error, message } = useSelector(
    (state) => state.timeline
  );
  const dispatch = useDispatch();

  const handleDeleteTimeline = (id) => {
    dispatch(deleteTimeline(id));
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
  }, [dispatch, loading, error]);

  return (
    <div className="manage-timeline-container">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card className="timeline-card">
            <CardHeader className="timeline-header">
              <CardTitle className="card-title">Manage Your Timeline</CardTitle>
              <Button
                className="return-button"
                onClick={handleReturnToDashboard}
              >
                Return to Dashboard
              </Button>
            </CardHeader>
            <CardContent className="table-container">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Description
                    </TableHead>
                    <TableHead className="hidden md:table-cell">From</TableHead>
                    <TableHead className="hidden md:table-cell">To</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeline.length > 0 ? (
                    timeline.map((element) => {
                      return (
                        <TableRow className="timeline-row" key={element._id}>
                          <TableCell className="font-medium">
                            {element.title}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {element.description}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {moment(element.timeline.from).format(
                              "DD MMM YYYY"
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {element.timeline.to
                              ? moment(element.timeline.to).format(
                                  "DD MMM YYYY"
                                )
                              : "Present"}
                          </TableCell>
                          <TableCell className="action-cell">
                            <button
                              className="delete-button"
                              onClick={() => handleDeleteTimeline(element._id)}
                            >
                              <Trash2 className="icon" />
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell className="no-timeline-message">
                        You have not added any timeline.
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

export default ManageTimeline;
