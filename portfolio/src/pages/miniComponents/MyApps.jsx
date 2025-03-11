import { Card } from "../../components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MyApps = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const getMyApps = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/softwareapplication/getall`, {
          withCredentials: true,
        });
        setApps(data.softwareApplications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    getMyApps();
  }, []);

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12 px-6 py-12">
      {/* Heading */}
      <div className="text-center">
        <h1
          className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.2rem] 
          font-extrabold tracking-[6px] flex justify-center items-center gap-3"
        >
          MY
          <span
            className="px-3 py-1 text-white font-extrabold bg-gradient-to-r 
            from-blue-500 to-purple-500 rounded-lg shadow-md"
          >
            APPS
          </span>
        </h1>
        <p className="text-gray-500 mt-1 text-md sm:text-lg">Explore My Software Creations</p>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {apps.length > 0 ? (
          apps.map((app) => (
            <Card
              key={app._id}
              className="h-fit p-6 flex flex-col justify-center items-center gap-3 rounded-lg shadow-md transition-transform hover:scale-105"
            >
              <img
                src={app.svg?.url || "/placeholder.svg"}
                alt={app.name}
                className="h-16 sm:h-24 w-auto"
              />
              <p className="text-gray-700 font-medium text-center">{app.name}</p>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No applications available</p>
        )}
      </div>
    </div>
  );
};

export default MyApps;
