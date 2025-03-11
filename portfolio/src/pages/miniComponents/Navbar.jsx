import React, { useState } from "react";
import { useTheme } from "../../components/theme-provider";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 mb-0 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Shraddha<span className="text-gray-900 dark:text-white">Kodes</span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-gray-900 dark:text-white font-medium">
          <li><a href="/" className="hover:text-blue-600">Home</a></li>
          <li><a href="http://localhost:5174/login" className="hover:text-blue-600">Dashboard</a></li>
          <li><a href="#portfolio" id="projects-link" className="hover:text-blue-600">Projects</a></li>
          <li><a href="#contact" id="contact-link" className="hover:text-blue-600">Contact</a></li>
        </ul>

       
        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="text-gray-900 dark:text-white text-lg">
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {/* CTA Button */}
          <a href="/resume" className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            Resume
          </a>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 absolute top-16 left-0 w-full shadow-lg p-4 flex flex-col gap-4">
          <a href="/" className="text-gray-900 dark:text-white" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="/dashboard" className="text-gray-900 dark:text-white" onClick={() => setMenuOpen(false)}>Dashboard</a>
          <a href="#portfolio" id="projects-link-mobile" className="text-gray-900 dark:text-white" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#contact" id="contact-link-mobile" className="text-gray-900 dark:text-white" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="/resume" className="bg-blue-600 text-white px-4 py-2 rounded-md text-center" onClick={() => setMenuOpen(false)}>Resume</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
