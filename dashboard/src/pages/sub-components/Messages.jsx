import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  clearAllMessageErrors,
  deleteMessage,
  getAllMessages,
  resetMessagesSlice,
} from "@/store/slices/messageSlice";
import SpecialLoadingButton from "./SpecialLoadingButton";
import "./Message.css"; // Import the CSS file

const Messages = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { messages, loading, error, message } = useSelector(
    (state) => state.messages
  );
  const [messageId, setMessageId] = useState("");

  const handleReturnToDashboard = () => navigateTo("/");

  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetMessagesSlice());
      dispatch(getAllMessages());
    }
  }, [dispatch, error, message, loading]);

  return (
    <div className="messages-container">
      <Tabs>
        <TabsContent>
          <Card className="main-card">
            <CardHeader className="header-container">
              <CardTitle>📩 Messages</CardTitle>
              <Button onClick={handleReturnToDashboard} className="return-btn">
                Return to Dashboard
              </Button>
            </CardHeader>

            <CardContent className="messages-list">
              {messages && messages.length > 0 ? (
                messages.map((element) => (
                  <Card key={element._id} className="message-card">
                    <CardContent className="message-content">
                      <CardDescription>
                        <span className="bold-text">Sender Name:</span> {element.senderName}
                      </CardDescription>
                      <CardDescription>
                        <span className="bold-text">Subject:</span> {element.subject}
                      </CardDescription>
                      <CardDescription>
                        <span className="bold-text">Message:</span> {element.message}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="footer-container">
                      {loading && messageId === element._id ? (
                        <SpecialLoadingButton content={"Deleting"} width={"w-32"} />
                      ) : (
                        <Button className="delete-btn" onClick={() => handleMessageDelete(element._id)}>
                          Delete
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="no-messages">🚀 No Messages Found!</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Messages;
