import axios from "axios";
import React, { useEffect, useState } from "react";
import { Briefcase, GraduationCap } from "lucide-react"; // Icons for Experience & Education

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMyTimeline = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/timeline/getall`, {
          withCredentials: true,
        });

        if (!data || !data.timelines) {
          throw new Error("Invalid API response: No timeline data received");
        }

        setTimeline(data.timelines);
      } catch (error) {
        console.error("Failed to fetch timeline:", error);
        setError(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    getMyTimeline();
  }, []);

  // Format Dates (Convert MongoDB ISO String to "Month YYYY")
  const formatDate = (dateString) => {
    if (!dateString) return "Present"; // If `to` is null, show "Present"
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-6 sm:px-12 bg-white shadow-lg transition-all">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center sm:text-left">
        My Journey
      </h1>

      {/* Show Loading */}
      {loading && (
        <p className="text-gray-600 text-lg sm:text-xl font-semibold animate-pulse text-center">
          Loading timeline...
        </p>
      )}

      {/* Show Error Message */}
      {error && (
        <p className="text-red-500 text-lg sm:text-xl font-semibold text-center">
          {error}
        </p>
      )}

      {/* Render Timeline Only If Data Exists */}
      {!loading && !error && timeline.length > 0 ? (
        <ol className="relative border-l-4 border-blue-300">
          {timeline.map((item, index) => (
            <li key={item._id} className="mb-10 ml-6 relative">
              {/* Timeline Icon */}
              <span
                className={`absolute flex items-center justify-center w-8 h-8 text-white rounded-full 
                -left-4 shadow-md ${index % 2 === 0 ? "bg-blue-600" : "bg-purple-600"}`}
              >
                {index % 2 === 0 ? <GraduationCap size={20} /> : <Briefcase size={20} />}
              </span>

              {/* Timeline Content */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-md transition hover:shadow-lg w-full">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <time className="block text-sm text-gray-500 mb-2">
                  {formatDate(item.timeline?.from)} - {formatDate(item.timeline?.to)}
                </time>
                <p className="text-gray-700">{item.description}</p>

                {/* Show Grade Only for Education */}
                {item.grade && (
                  <p className="mt-2 text-blue-600 font-medium text-sm">
                    Grade: {item.grade}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        !loading &&
        !error && (
          <p className="text-center text-gray-600 text-lg sm:text-xl font-semibold">
            No timeline data available.
          </p>
        )
      )}
    </section>
  );
};

export default Timeline;
