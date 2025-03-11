import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Contact = () => {
  const [senderName, setSenderName] = useState("Shraddha Kumari");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMessage = async (e) => {
    e.preventDefault();
    if (!subject || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/message/send`,
        { senderName, subject, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(res.data.message);
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-white text-gray-900 px-6 sm:px-12 py-12" id="contact">
      {/* Header */}
      <div className="relative text-center mb-8">
        <h1 className="text-[2.5rem] sm:text-[3rem] font-extrabold tracking-wide flex items-center justify-center gap-4">
          CONTACT <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-lg shadow-lg">ME</span>
        </h1>
        <p className="text-gray-500 text-lg uppercase">Let's get in touch</p>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleMessage} className="w-full max-w-lg bg-white/70 shadow-xl backdrop-blur-lg p-6 sm:p-10 rounded-2xl flex flex-col gap-6">
        {/* Name (disabled) */}
        <div className="flex flex-col gap-2">
          <Label className="text-lg font-semibold">Your Name</Label>
          <Input value={senderName} disabled className="opacity-70 cursor-not-allowed bg-gray-100 rounded-lg p-3" />
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-2">
          <Label className="text-lg font-semibold">Subject</Label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
            className="rounded-lg p-3 border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <Label className="text-lg font-semibold">Message</Label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            rows="4"
            className="w-full border p-3 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 transition"
          ></textarea>
        </div>

        {/* Send Button */}
        <div className="flex justify-center">
          {!loading ? (
            <Button className="w-full sm:w-48 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition-all duration-300 text-white font-semibold py-3 rounded-lg">
              SEND MESSAGE
            </Button>
          ) : (
            <button
              disabled
              className="w-full sm:w-48 flex items-center justify-center bg-gray-300 text-gray-700 rounded-lg px-4 py-3 shadow-md"
            >
              <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 100 101" fill="none">
                <path d="M100 50.6C100 78.2 77.6 100.6 50 100.6C22.4 100.6 0 78.2 0 50.6C0 22.98 22.4 0.6 50 0.6C77.6 0.6 100 22.98 100 50.6Z" fill="#E5E7EB"/>
                <path d="M93.97 39.04C96.39 38.4 97.86 35.91 97.01 33.55C95.29 28.82 92.87 24.37 89.82 20.35C85.85 15.12 80.88 10.72 75.21 7.41C69.54 4.1 63.28 1.94 56.77 1.05C51.77 0.37 46.7 0.45 41.73 1.28C39.26 1.69 37.81 4.2 38.45 6.62C39.09 9.05 41.57 10.47 44.05 10.11C47.85 9.55 51.72 9.53 55.54 10.05C60.86 10.78 65.99 12.55 70.63 15.26C75.27 17.96 79.33 21.56 82.58 25.84C84.92 28.91 86.8 32.29 88.18 35.88C89.08 38.22 91.54 39.68 93.97 39.04Z" fill="currentColor"/>
              </svg>
              Sending...
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Contact;
