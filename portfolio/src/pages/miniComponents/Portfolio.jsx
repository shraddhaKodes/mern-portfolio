import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getMyProjects = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/project/getall`, {
          withCredentials: true,
        });
        setProjects(data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    getMyProjects();
  }, []);

  return (
    <div className="container mx-auto px-6 py-12" id="portfolio">
      {/* Portfolio Heading */}
      <div className="relative mb-10 text-center">
        <h1
          className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.2rem] 
          font-extrabold flex justify-center items-center gap-3 tracking-[6px]"
        >
          MY
          <span
            className="px-3 py-1 text-white font-extrabold bg-gradient-to-r 
            from-blue-500 to-purple-500 rounded-lg shadow-md"
          >
            PORTFOLIO
          </span>
        </h1>
        <p className="text-gray-500 mt-1 text-md sm:text-lg">
          SHOWCASING MY PROJECTS & WORK
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {viewAll
          ? projects.map((element) => (
              <Link to={`/project/${element._id}`} key={element._id}>
                <Card className="overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform">
                  <img
                    src={element.projectBanner?.url || "/placeholder.jpg"}
                    alt={element.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{element.title}</h3>
                  </div>
                </Card>
              </Link>
            ))
          : projects.slice(0, 9).map((element) => (
              <Link to={`/project/${element._id}`} key={element._id}>
                <Card className="overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform">
                  <img
                    src={element.projectBanner?.url || "/placeholder.jpg"}
                    alt={element.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{element.title}</h3>
                  </div>
                </Card>
              </Link>
            ))}
      </div>

      {/* Show More / Show Less Button */}
      {projects.length > 9 && (
        <div className="w-full text-center mt-8">
          <Button
            className="px-6 py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 
              transition-colors rounded-md shadow-md text-white"
            onClick={() => setViewAll(!viewAll)}
          >
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
