import React from "react";

const About = () => {
  return (
    <div className="w-full flex flex-col items-center px-6 sm:px-12 lg:px-24 py-12 bg-gradient-to-b from-white to-blue-50 text-gray-900">
      {/* Header Section */}
      <div className="relative text-center mb-8">
        <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] font-extrabold tracking-wide flex items-center justify-center gap-4">
          ABOUT <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-lg shadow-lg">ME</span>
        </h1>
        <p className="text-gray-500 text-lg uppercase">Allow me to introduce myself.</p>
      </div>

      {/* Content Section */}
      <div className="grid md:grid-cols-2 items-center gap-12 my-12">
        {/* Image Section */}
        <div className="flex justify-center relative">
          <div className="bg-white p-2 rounded-lg shadow-lg">
            <img
              src="/me.jpeg"
              alt="Shraddha Kumari"
              className="rounded-lg shadow-lg transform rotate-[-3deg] hover:rotate-0 transition-all duration-500 h-[260px] sm:h-[340px] md:h-[400px] lg:h-[450px]"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="text-left md:text-justify text-lg tracking-wide space-y-6">
          <p>
            My name is <span className="font-bold text-blue-600">Shraddha Kumari</span>. I am currently pursuing a 
            <span className="text-blue-500 font-semibold"> B.Tech in Electrical Engineering</span> at MNNIT.
            My passion lies in <span className="font-semibold text-indigo-500">web development</span>, 
            <span className="font-semibold text-purple-500"> competitive coding</span>, and <span className="font-semibold text-green-500"> robotics</span>.
          </p>
          <p>
            My expertise includes <span className="font-semibold">full-stack web development</span>, 
            <span className="text-red-500"> C++</span>, <span className="text-yellow-500"> Python</span>, and 
            <span className="text-blue-500"> circuit modeling using MATLAB</span>.
          </p>
          <p>
            Apart from technology, I love solving challenging coding problems, exploring new frameworks, 
            and participating in hackathons. I am also actively working on my project, 
            <span className="font-bold text-pink-500"> Aura Tracker</span>, which helps users manage their 
            academic goals efficiently.
          </p>
          <p className="text-xl font-semibold text-gray-700">
            "I believe in <span className="text-green-500">persistence</span>, 
            <span className="text-blue-500"> problem-solving</span>, and <span className="text-orange-500">teamwork</span> 
            to achieve great results!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
