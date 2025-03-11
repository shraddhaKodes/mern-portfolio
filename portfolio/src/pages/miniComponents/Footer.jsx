import React from "react";

const Footer = () => {
  return (
    <footer className="p-6 mt-10 w-full max-w-[1050px] mx-auto text-center sm:text-left">
      <hr className="border-gray-300 mb-5" />
      <h1
        className="text-[2rem] sm:text-[2.5rem] font-semibold tracking-[5px] sm:tracking-[8px] 
        text-tubeLight-effect animate-pulse"
      >
        ✨ Thanks for Scrolling ✨
      </h1>
      <p className="text-gray-500 text-md mt-2">
        Crafted with ❤️ by Shraddha Kumari
      </p>
    </footer>
  );
};

export default Footer;
