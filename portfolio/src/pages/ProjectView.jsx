import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "../components/ui/button";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(`${BASE_URL}/project/get/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTitle(res.data.project.title);
          setDescription(res.data.project.description);
          setStack(res.data.project.stack);
          setDeployed(res.data.project.deployed);
          setTechnologies(res.data.project.technologies);
          setGitRepoLink(res.data.project.gitRepoLink);
          setProjectLink(res.data.project.projectLink);
          setProjectBanner(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
          setProjectBannerPreview(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getProject();
  }, [id]);

  const descriptionList = description.split(". ");
  const technologiesList = technologies.split(", ");

  const navigateTo = useNavigate();
  const handleReturnToPortfolio = () => {
    navigateTo("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">{title}</h1>
          <Button
            onClick={handleReturnToPortfolio}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
          >
            Return to Portfolio
          </Button>
        </div>

        <img
          src={projectBannerPreview ? projectBannerPreview : "/avatarHolder.jpg"}
          alt="Project Banner"
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />

        <div className="mt-6">
          <p className="text-xl font-semibold text-gray-800">Description:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {descriptionList.map((item, index) => (
              <li key={index} className="hover:text-gray-900">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <p className="text-xl font-semibold text-gray-800">Technologies:</p>
          <ul className="flex flex-wrap gap-2 mt-2">
            {technologiesList.map((tech, index) => (
              <li
                key={index}
                className="px-3 py-1 bg-blue-200 rounded-lg text-gray-800 text-sm"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <p className="text-xl font-semibold text-gray-800">Stack:</p>
          <p className="text-gray-700">{stack}</p>
        </div>

        <div className="mt-6">
          <p className="text-xl font-semibold text-gray-800">Deployed:</p>
          <p className="text-gray-700">{deployed}</p>
        </div>

        <div className="mt-6">
          <p className="text-xl font-semibold text-gray-800">GitHub Repository:</p>
          <Link
            to={gitRepoLink}
            target="_blank"
            className="text-blue-600 underline hover:text-blue-800"
          >
            {gitRepoLink}
          </Link>
        </div>

        <div className="mt-6">
          <p className="text-xl font-semibold text-gray-800">Project Link:</p>
          <Link
            to={projectLink}
            target="_blank"
            className="text-blue-600 underline hover:text-blue-800"
          >
            {projectLink}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
