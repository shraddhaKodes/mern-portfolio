import {
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "../../components/ui/button";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Hero = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/user/portfolio/me`, {
          withCredentials: true,
        });
        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };
    getMyProfile();
  }, []);

  return (
    <section className="w-full max-w-6xl mx-auto text-center py-8 px-8 sm:px-10 bg-white shadow-md transition-all">
      {/* Online Indicator */}
      <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
        <span className="bg-green-500 h-3 w-3 animate-pulse"></span>
        <p className="text-gray-700 text-base">Online</p>
      </div>

      {/* Name & Typewriter Effect */}
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide mb-4 text-gray-900 uppercase">
        Hey, I'm <span className="text-blue-600">Shraddha Kumari</span>
      </h1>
      <h2 className="text-blue-500 text-lg sm:text-2xl md:text-3xl font-semibold tracking-widest">
        <Typewriter
          words={[
            "FULL STACK DEVELOPER",
            "NODE.JS  ENTHUSIAST",
          ]}
          loop={50}
          cursor
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h2>

      {/* Social Media Links */}
      <div className="flex justify-center sm:justify-start gap-6 mt-6">
        <Link to="https://www.youtube.com/@shraddhakumari4174" target="_blank">
          <Youtube className="text-red-500 w-8 h-8 hover:scale-110 transition duration-200" />
        </Link>
        <Link to={user?.instagramURL || "#"} target="_blank">
          <Instagram className="text-pink-500 w-8 h-8 hover:scale-110 transition duration-200" />
        </Link>
        <Link
          to={user?.linkedInURL || "https://www.linkedin.com/in/shraddhakodes/"}
          target="_blank"
        >
          <Linkedin className="text-sky-500 w-8 h-8 hover:scale-110 transition duration-200" />
        </Link>
        <Link to={user?.twitterURL || "#"} target="_blank">
          <Twitter className="text-blue-600 w-8 h-8 hover:scale-110 transition duration-200" />
        </Link>
      </div>

      {/* GitHub & Resume Buttons */}
      <div className="flex justify-center sm:justify-start gap-6 mt-6">
        <Link to={user?.githubURL || "#"} target="_blank">
          <Button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white hover:bg-gray-700 transition-all">
            <Github />
            GitHub
          </Button>
        </Link>
        <Link to={user?.resume?.url || "#"} target="_blank">
          <Button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white hover:bg-blue-500 transition-all">
            <ExternalLink />
            Resume
          </Button>
        </Link>
      </div>
      {/* Separator */}
      <hr className="my-12 border-gray-400 w-full" />
    </section>
  );
};

export default Hero;
