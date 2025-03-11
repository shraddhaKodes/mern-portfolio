import { Card } from "../../components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const getMySkills = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/skill/getall`, {
          withCredentials: true,
        });
        setSkills(data.skills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    getMySkills();
  }, []);

  return (
    <div className="w-full flex flex-col gap-10 px-6 py-12">
      {/* Twinkling Cursive Heading */}
      <div className="text-center relative">
        <h1
          className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] 
          font-extrabold tracking-widest italic mx-auto w-fit animate-pulse"
          style={{
            fontFamily: "'Dancing Script', cursive",
            background:
              "linear-gradient(to right, #ff8a00, #e52e71, #9b59b6, #1e90ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ✨ My Skills ✨
        </h1>
        <p className="text-gray-600 mt-2 text-md sm:text-lg">
          A Glimpse of My Technical Proficiency
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <Card
              key={skill._id}
              className="h-fit p-6 flex flex-col justify-center items-center gap-3 
              rounded-lg shadow-md transition-transform hover:scale-105 bg-white"
            >
              {/* Skill Icon */}
              <img
                src={skill.svg?.url || "/placeholder.svg"}
                alt={skill.title}
                className="h-16 sm:h-24 w-auto"
              />
              {/* Skill Title */}
              <p className="text-gray-700 font-semibold text-center">
                {skill.title}
              </p>
              {/* Skill Proficiency Bar */}
              <div className="w-full bg-gray-300 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full transition-all"
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>
              <p className="text-gray-600 text-sm">{skill.proficiency}%</p>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No skills available
          </p>
        )}
      </div>
    </div>
  );
};

export default Skills;
